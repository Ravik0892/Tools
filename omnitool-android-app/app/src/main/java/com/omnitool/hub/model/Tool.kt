package com.omnitool.hub.model

data class Tool(
    val id: String,
    val name: String,
    val desc: String,
    val category: String,
    val type: String
)

object ToolRepository {
    val tools = listOf(
        Tool("json-formatter", "JSON Formatter", "Beautify, minify, and validate JSON inputs.", "dev", "Formatters"),
        Tool("yaml-csv", "YAML & CSV Converter", "Interconvert JSON, YAML, and CSV files.", "dev", "Formatters"),
        Tool("base64", "Base64 Encoder", "Encode and decode Base64 strings securely.", "dev", "Encoders"),
        Tool("jwt-decoder", "JWT Decoder", "Parse claims and signatures of web tokens.", "dev", "Encoders"),
        Tool("aes-crypto", "AES Encryption", "Encrypt or decrypt texts with AES-256 GCM.", "dev", "Crypto"),
        Tool("hash-gen", "Hash Generator", "Generate MD5, SHA-256, SHA-512 hashes.", "dev", "Crypto"),
        Tool("uuid-gen", "UUID v4 Generator", "Bulk generate cryptographically secure UUIDs.", "dev", "Generators"),
        Tool("password-gen", "Password Generator", "Generate high-strength randomized passwords.", "dev", "Generators"),
        Tool("case-converter", "Text Case Converter", "Convert text cases (UPPER, lower, camel, snake).", "text", "Transformations"),
        Tool("word-counter", "Word & Line Counter", "Count words, lines, chars, and reading speed.", "text", "Transformations"),
        Tool("markdown-preview", "Markdown Editor", "Live preview rendered markdown schemas.", "text", "Writers"),
        Tool("regex-tester", "Regex Tester", "Test javascript and Kotlin regular expressions.", "text", "Pattern Analysis"),
        Tool("text-diff", "Text Diff Utility", "Compare two text fields and find visual deltas.", "text", "Pattern Analysis"),
        Tool("color-lab", "Color Studio & Palette", "Examine hex, rgb, hsl values and generate tints.", "design", "Color"),
        Tool("gradient-gen", "CSS Gradient Generator", "Build linear/radial gradients and copy styles.", "design", "CSS"),
        Tool("box-shadow", "Box Shadow Builder", "Interactive box-shadow visualizer tool.", "design", "CSS"),
        Tool("qr-generator", "QR Code Generator", "Generate customizeable high-quality vector QRs.", "design", "Graphics"),
        Tool("svg-animator", "SVG Layout Animator", "Preview and animate SVG vector items.", "design", "Graphics"),
        Tool("calc", "Scientific Calculator", "A rich calculations console with matrix support.", "math", "Calculator"),
        Tool("unit-conv", "Universal Unit Converter", "Convert weight, length, temperature, data rates.", "math", "Conversion"),
        Tool("subnet-calc", "IP Subnet Calculator", "Calculate subnets, CIDRs, hosts, ranges.", "math", "Conversion"),
        Tool("native-logcat", "Logcat Viewer", "Capture and filter live Android system logs directly on the device.", "dev", "Diagnostics"),
        Tool("native-device-info", "Device Diagnostics", "View live RAM stats, battery health metrics, and hardware specifications.", "dev", "Diagnostics")
    )
}
