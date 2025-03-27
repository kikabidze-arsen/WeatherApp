export function showFooterYear() {
    const footerYearElement = document.getElementById('currentYear');

    const now = new Date();
    const yearNow = now.getFullYear();
    footerYearElement.textContent = `© ${yearNow}`
}