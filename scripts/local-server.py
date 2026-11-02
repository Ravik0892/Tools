import sys
import os
import json
import hmac
import hashlib
import time
import base64
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

MASTER_SECRET = os.environ.get("LICENSE_SECRET_KEY", "omnitool_master_crypto_secret_f839b2e0417a8c3d9152b").encode()
ADMIN_HASH = os.environ.get("ADMIN_PASSWORD_HASH", "efb6854ff3cb28f0f3cc0604b481df3eb4ffe5b765361e6d597f7ac5be6ae3a8")

def _make_token(tier, extra=None):
    payload = {"tier": tier, "iat": int(time.time()), "nonce": os.urandom(8).hex()}
    if extra:
        payload.update(extra)
    payload_str = json.dumps(payload, separators=(',', ':'))
    enc = base64.urlsafe_b64encode(payload_str.encode()).decode().rstrip('=')
    sig = hmac.new(MASTER_SECRET, enc.encode(), hashlib.sha256).hexdigest()
    return f"{enc}.{sig}"


class OmniToolServerHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_HEAD(self):
        raw_path = self.path.split("?")[0].split("#")[0]
        local_path = self.translate_path(raw_path)
        if not os.path.exists(local_path) and not raw_path.startswith("/api/"):
            if raw_path in ["/landing", "/welcome", "/showcase"]:
                self.path = "/landing.html"
            else:
                self.path = "/index.html"
        return super().do_HEAD()

    def do_GET(self):
        # SPA Fallback: If requested path does not exist on disk and is not an API call, serve landing or index.html
        raw_path = self.path.split("?")[0].split("#")[0]
        local_path = self.translate_path(raw_path)
        if not os.path.exists(local_path) and not raw_path.startswith("/api/"):
            if raw_path in ["/landing", "/welcome", "/showcase"]:
                self.path = "/landing.html"
            else:
                self.path = "/index.html"
        return super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length) if content_length > 0 else b"{}"
        try:
            body = json.loads(post_data.decode("utf-8"))
        except Exception:
            body = {}

        path = self.path.split("?")[0]

        if path == "/api/admin-auth":
            password = body.get("password", "")
            pw_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
            # Check password against configured ADMIN_HASH (default: OmniAdmin@2026#) or local dev fallback
            if hmac.compare_digest(pw_hash, ADMIN_HASH) or hmac.compare_digest(pw_hash, "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"):
                token = f"admin_{int(time.time())}"
                self._send_json(200, {"success": True, "token": token, "message": "Admin authorization successful."})
            else:
                self._send_json(401, {"success": False, "error": "Invalid administrative passcode."})
            return

        if path == "/api/verify-license":
            code = (body.get("code") or "").strip().upper()
            if code.startswith("OMNI-"):
                parts = code.split("-")
                if len(parts) == 4 and parts[1] in ("PRO", "MON"):
                    raw = f"OMNI-{parts[1]}-{parts[2]}"
                    expected_sig = hmac.new(MASTER_SECRET, raw.encode(), hashlib.sha256).hexdigest()[:8].upper()
                    if parts[3] == expected_sig:
                        tier = "premium" if parts[1] == "MON" else "lifetime"
                        token = _make_token(tier, {"source": "local_server_verified"})
                        self._send_json(200, {"success": True, "tier": tier, "token": token, "message": f"🎉 {tier.title()} License verified!"})
                        return
                self._send_json(401, {"success": False, "error": "Invalid cryptographic license key signature."})
                return
            self._send_json(401, {"success": False, "error": "Unrecognized license key format."})
            return

        if path == "/api/create-razorpay-order":
            plan = body.get("plan", "lifetime")
            amt = 39900 if plan == "monthly" else 249900
            order_id = f"order_demo_{os.urandom(6).hex()}"
            self._send_json(200, {"success": True, "orderId": order_id, "amount": amt, "currency": "INR", "keyId": "rzp_test_OmniToolDemoKey", "plan": plan})
            return

        if path == "/api/verify-razorpay-payment":
            plan = body.get("plan", "lifetime")
            tier = "premium" if plan == "monthly" else "lifetime"
            token = _make_token(tier, {"source": "razorpay_local"})
            self._send_json(200, {"success": True, "tier": tier, "token": token, "message": "🎉 Payment verified!"})
            return

        if path == "/api/verify-paypal-payment":
            plan = body.get("plan", "lifetime")
            tier = "premium" if plan == "monthly" else "lifetime"
            token = _make_token(tier, {"source": "paypal_local"})
            self._send_json(200, {"success": True, "tier": tier, "token": token, "message": "🎉 PayPal payment verified!"})
            return

        if path == "/api/submit-utr":
            ref_id = f"OMNI-REF-{os.urandom(4).hex().upper()}"
            self._send_json(200, {"success": True, "referenceId": ref_id, "message": "Payment reference registered for bank statement verification."})
            return

        if path == "/api/admin-generate-key":
            tier = body.get("tier", "lifetime")
            tier_code = "MON" if tier == "premium" else "PRO"
            cust_id = (body.get("customerId") or "").strip().upper().replace(" ", "")[:8]
            if not cust_id:
                cust_id = os.urandom(4).hex().upper()
            raw = f"OMNI-{tier_code}-{cust_id}"
            sig = hmac.new(MASTER_SECRET, raw.encode(), hashlib.sha256).hexdigest()[:8].upper()
            key = f"{raw}-{sig}"
            self._send_json(200, {
                "success": True,
                "licenseKey": key,
                "tier": tier,
                "generatedAt": int(time.time()),
                "note": "Cryptographically signed key generated by local server."
            })
            return

        if path == "/api/deploy-live":
            config_data = body.get("config", {})
            commit_msg = body.get("commitMessage") or "chore(config): update live site settings via Admin Panel"
            push_to_live = body.get("pushToLive", True)

            if not config_data:
                self._send_json(400, {"success": False, "error": "Configuration object required."})
                return

            config_file = os.path.join(ROOT, "ad-config.json")
            with open(config_file, "w", encoding="utf-8") as f:
                json.dump(config_data, f, indent=2)

            android_config = os.path.join(ROOT, "omnitool-android-app", "app", "src", "main", "assets", "web", "ad-config.json")
            if os.path.exists(os.path.dirname(android_config)):
                try:
                    with open(android_config, "w", encoding="utf-8") as f:
                        json.dump(config_data, f, indent=2)
                except Exception:
                    pass

            git_output = ""
            git_pushed = False

            if push_to_live:
                try:
                    import subprocess
                    subprocess.run(["git", "add", "ad-config.json"], cwd=ROOT, capture_output=True, text=True)
                    if os.path.exists(android_config):
                        subprocess.run(["git", "add", "omnitool-android-app/app/src/main/assets/web/ad-config.json"], cwd=ROOT, capture_output=True, text=True)

                    c_res = subprocess.run(["git", "commit", "-m", commit_msg], cwd=ROOT, capture_output=True, text=True)
                    git_output += c_res.stdout + c_res.stderr

                    b_res = subprocess.run(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=ROOT, capture_output=True, text=True)
                    cur_branch = b_res.stdout.strip() or "main"

                    p_res = subprocess.run(["git", "push", "origin", cur_branch], cwd=ROOT, capture_output=True, text=True)
                    git_output += "\n" + p_res.stdout + p_res.stderr
                    git_pushed = (p_res.returncode == 0)

                    if cur_branch != "main":
                        try:
                            # Stash any dirty uncommitted files safely
                            has_stash = False
                            st_chk = subprocess.run(["git", "status", "--porcelain"], cwd=ROOT, capture_output=True, text=True)
                            if st_chk.stdout.strip():
                                subprocess.run(["git", "stash", "push", "-u", "-m", "omnitool-deploy-temp-stash"], cwd=ROOT, capture_output=True)
                                has_stash = True

                            subprocess.run(["git", "checkout", "main"], cwd=ROOT, capture_output=True, check=True)
                            subprocess.run(["git", "checkout", cur_branch, "--", "ad-config.json"], cwd=ROOT, capture_output=True, check=True)
                            if os.path.exists(android_config):
                                subprocess.run(["git", "checkout", cur_branch, "--", "omnitool-android-app/app/src/main/assets/web/ad-config.json"], cwd=ROOT, capture_output=True)

                            subprocess.run(["git", "commit", "-m", commit_msg], cwd=ROOT, capture_output=True)
                            mp_res = subprocess.run(["git", "push", "origin", "main"], cwd=ROOT, capture_output=True, text=True)
                            git_output += "\n" + mp_res.stdout + mp_res.stderr

                            subprocess.run(["git", "checkout", cur_branch], cwd=ROOT, capture_output=True)
                            if has_stash:
                                subprocess.run(["git", "stash", "pop"], cwd=ROOT, capture_output=True)
                        except Exception as m_err:
                            git_output += f"\nMain branch config sync notice: {m_err}"
                            subprocess.run(["git", "checkout", cur_branch], cwd=ROOT, capture_output=True)
                except Exception as g_err:
                    git_output += f"\nGit sync error: {g_err}"

            self._send_json(200, {
                "success": True,
                "message": "🚀 Settings saved to ad-config.json and published to Live Website!" if git_pushed else "✅ Settings saved locally to ad-config.json.",
                "gitPushed": git_pushed,
                "gitOutput": git_output.strip()
            })
            return

        self._send_json(404, {"error": "API route not found"})

    def _send_json(self, status, data):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == "__main__":
    server = HTTPServer(("127.0.0.1", PORT), OmniToolServerHandler)
    print(f"Serving {ROOT} at http://127.0.0.1:{PORT}/ (Python Serverless-Ready Handler)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
