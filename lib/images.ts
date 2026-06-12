export function productImages(p: { image?: string; images?: string[] }): string[] {
    if (p.images && p.images.length > 0) return p.images;
    if (p.image) return [p.image];
    return [];
}