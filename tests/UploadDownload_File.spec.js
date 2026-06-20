const { test, expect } = require('@playwright/test')
const ExcelJs = require('exceljs');


async function writeExcel(searchText, newText, change, filePath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = newText;
    await workbook.xlsx.writeFile(filePath)
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }

        })
    })
    return output;

}
//update mango price to 350
//writeExcel("Mango",350,{rowChange:0,colChange:2},"C:/Users/nancy/download.xlsx");
test("excel upload download functionality", async ({ page }) => {
    const textSearch = "Mango";
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    //to wait for download
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download" }).click();
    const download = await downloadPromise;
    const filePath = "C:/Users/nancy/Downloads/download.xlsx";

    // Save the downloaded file to your Downloads folder
    await download.saveAs(filePath);
    await writeExcel(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
    await page.locator("#fileinput").click();
    //to upload files use set input files.it will work only if atrribute type is file
    await page.locator("#fileinput").setInputFiles(filePath);
    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
})
