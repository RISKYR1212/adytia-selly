const GAS_URL = "https://script.google.com/macros/s/AKfycbzstQkc7TrpFejH_AcdoQlA1wvM3hrT9-4JpP-S-MnjFU_1-ar6s9PdRAEXLI2DSVboAw/exec";
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const data = JSON.parse(e.postData.contents);

  const waktu = new Date().toLocaleString("id-ID");
  ss.appendRow([data.nama, data.ucapan, data.kehadiran, waktu]);

  const output = ContentService.createTextOutput(
    JSON.stringify({ status: "sukses", waktu })
  );
  output.setMimeType(ContentService.MimeType.JSON);

  // CORS
  output.addHeader("Access-Control-Allow-Origin", "*");
  output.addHeader("Access-Control-Allow-Methods", "POST");
  output.addHeader("Access-Control-Allow-Headers", "Content-Type");

  return output;
}


function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const rows = ss.getDataRange().getValues();

  const result = rows.slice(1).map(r => ({
    nama: r[0],
    ucapan: r[1],
    kehadiran: r[2],
    waktu: r[3]
  }));

  const output = ContentService.createTextOutput(JSON.stringify(result));
  output.setMimeType(ContentService.MimeType.JSON);

  // CORS
  output.addHeader("Access-Control-Allow-Origin", "*");
  output.addHeader("Access-Control-Allow-Methods", "GET");
  output.addHeader("Access-Control-Allow-Headers", "Content-Type");

  return output;
}


// Untuk menangani OPTIONS / CORS preflight
function doOptions(e) {
  const output = ContentService.createTextOutput("");
  output.addHeader("Access-Control-Allow-Origin", "*");
  output.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  output.addHeader("Access-Control-Allow-Headers", "Content-Type");
  return output;
}
