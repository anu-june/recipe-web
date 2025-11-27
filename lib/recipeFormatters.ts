// Utility functions for formatting recipe ingredients and steps

/**
 * Format ingredients to consistent "Ingredient - Quantity" format
 */
export function formatIngredients(text: string): string {
    const lines = text.trim().split('\n');

    return lines
        .map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';

            // Check if already formatted with " - "
            if (trimmed.match(/^.+\s+-\s+.+$/)) {
                return trimmed;
            }

            // Try to split on common dash patterns (-, –, —)
            const dashMatch = trimmed.match(/^(.+?)\s*[-–—]\s*(.+)$/);
            if (dashMatch) {
                return `${dashMatch[1].trim()} - ${dashMatch[2].trim()}`;
            }

            // If it's a section header or can't parse, leave as-is
            return trimmed;
        })
        .filter(line => line.length > 0)
        .join('\n');
}

/**
 * Format steps to consistent numbered format "1. Step description"
 */
export function formatSteps(text: string): string {
    const lines = text.trim().split('\n');
    let stepNumber = 1;

    return lines
        .map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';

            // Check if already numbered (e.g., "1.", "1)", "1:")
            if (trimmed.match(/^\d+[\.):\s]/)) {
                return trimmed;
            }

            // Add step number
            return `${stepNumber++}. ${trimmed}`;
        })
        .filter(line => line.length > 0)
        .join('\n');
}
