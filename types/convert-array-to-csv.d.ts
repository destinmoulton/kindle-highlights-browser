declare module "convert-array-to-csv" {
    export default function convertArrayToCSV(
        arr: any,
        options: { header: string[] }
    ): string;
}
