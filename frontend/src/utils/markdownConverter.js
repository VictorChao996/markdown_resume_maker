function convertMarkdownToHtml(markdown) {
    // Replace special characters to prevent HTML injection
    const escapeHtml = (text) => {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
    }

    // Helper function to process each Markdown element
    const processElement = (element) => {
        if (/^#+\s/.test(element)) {
            // Handle headings
            const headingLevel = element.match(/^(#+)\s/)[1].length
            const headingText = element.replace(/^(#+)\s/, "")
            return `<h${headingLevel}>${headingText}</h${headingLevel}>`
        } else if (element.startsWith("* ")) {
            // Handle unordered lists starting with asterisk
            const listItemText = element.replace(/^\* /, "")
            return `<li>${listItemText}</li>`
        } else if (element.startsWith("- ")) {
            // Handle unordered lists starting with dash
            const listItemText = element.replace(/^- /, "")
            return `<li>${listItemText}</li>`
        } else if (/\*\*.*\*\*/.test(element)) {
            // Handle bold formatting
            const boldText = element.replace(
                /\*\*(.*)\*\*/,
                "<strong>$1</strong>"
            )
            return boldText
        } else {
            // Treat everything else as a paragraph
            return `<p>${element}</p>`
        }
    }

    // Split the Markdown into individual lines
    const lines = markdown.split("\n")

    // Process each line and join them together
    let html = ""
    if (lines.length > 0) {
        html = lines
            .map((line) => {
                return processElement(escapeHtml(line))
            })
            .join("")
    }

    // Wrap the HTML content in a <> container
    // return `<div>${html}</div>`
    return `${html}`
}

export default convertMarkdownToHtml
