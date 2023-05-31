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

    /**
     * * 處理 inline content
     * Wrap the content inside a function to be able to handle inline elements
     * @param {*} content
     * @returns
     */
    const processContent = (content) => {
        // Handle bold formatting
        let processedContent = content
        const boldPattern = /\*\*([^*]+)\*\*/g
        processedContent = processedContent.replace(
            boldPattern,
            "<strong>$1</strong>"
        )

        // Handle italic formatting
        // Do this after replacing bold syntax to avoid conflict
        const italicPattern = /(?<!\*)\*([^*]+)\*(?!\*)/g
        processedContent = processedContent.replace(
            italicPattern,
            "<em>$1</em>"
        )

        return processedContent
    }

    /**
     * * 單行分析 markdown 並轉換成 html element
     * Helper function to process each Markdown element
     * @param {*} element
     * @returns
     */
    const processElement = (element) => {
        if (/^#+\s/.test(element)) {
            // Handle headings
            const headingLevel = element.match(/^(#+)\s/)[1].length
            const headingText = element.replace(/^(#+)\s/, "")
            return `<h${headingLevel}>${processContent(
                headingText
            )}</h${headingLevel}>`
        } else if (element.startsWith("* ")) {
            // Handle unordered lists
            const listItemText = element.replace(/^\* /, "")
            return `<li>${processContent(listItemText)}</li>`
        } else if (element.startsWith("- ")) {
            // Handle unordered lists starting with dash
            const listItemText = element.replace(/^- /, "")
            return `<li>${processContent(listItemText)}</li>`
        } else if (/^:::\s(.+?)\s:::\s(.+?)\s:::\s(.+?)\s:::$/.test(element)) {
            // Handle custom div structure
            const [_, time, role, company] = element.match(
                /^:::\s(.+?)\s:::\s(.+?)\s:::\s(.+?)\s:::$/
            )
            return `
                    <div class="flex-single-experience">
                        <span>${time}</span>
                        <span>${role}</span>
                        <span>${company}</span>
                    </div>
                `
        } else if (element.startsWith("::: skills start")) {
            return `<div class="flex-skills">`
        } else if (element.startsWith("::: skills end")) {
            return `</div>`
        } else if (element.startsWith("::: info start")) {
            return `<div class="flex-info">`
        } else if (element.startsWith("::: info end")) {
            return `</div>`
        } else if (element.startsWith("::: start")) {
            return `<div class="flex">`
        } else if (element.startsWith("::: end")) {
            return `</div>`
        } else {
            //Treat everything else as a paragraph
            return `<p>${processContent(element)}</p>`
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
