export async function convertBase64ToFile(base64: string, fileName: string) {
    // data:image/jpg;udd87g6zxgy8b789cxb79oioyfd8g79980bx7
    // data:application/pdf;1894y8ihfdsisgfd
    const type = base64.substring("data:".length, base64.indexOf(";"));
    const res = await fetch(base64);
    const buf = await res.arrayBuffer();
    return new File([buf], fileName, { type })
}
