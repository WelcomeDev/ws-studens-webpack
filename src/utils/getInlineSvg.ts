export async function getInlineSvg(svgPath: string) {
    const svgModule = await import(`/src/assets/icons/${svgPath}`);
    return new DOMParser().parseFromString(svgModule.default, 'image/svg+xml').documentElement;
}