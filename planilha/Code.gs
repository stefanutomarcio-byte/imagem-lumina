/**
 * Clínica Lumina — recebe os dados do formulário do site e grava na planilha.
 * Cole este código em Extensões → Apps Script da sua Planilha Google.
 * Passo a passo completo: veja TUTORIAL-PLANILHA.md
 */

var ABA = 'Agendamentos';
var CABECALHO = ['Data/Hora','Nome','Idade','Sexo','Gênero','WhatsApp','Exame','Atendimento','Consentimento LGPD','Origem'];
var COLUNA_ORDENACAO = 2; // 2 = Nome. Troque para 3 = Idade, 4 = Sexo, 5 = Gênero, se preferir.

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(ABA) || ss.insertSheet(ABA);

    // cria o cabeçalho na primeira vez
    if (sh.getLastRow() === 0) {
      sh.appendRow(CABECALHO);
      sh.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold').setBackground('#1E2C4F').setFontColor('#FBF7F0');
      sh.setFrozenRows(1);
      sh.setColumnWidths(1, CABECALHO.length, 140);
    }

    var d = JSON.parse(e.postData.contents);
    var tz = Session.getScriptTimeZone() || 'America/Sao_Paulo';
    var quando = Utilities.formatDate(new Date(), tz, 'dd/MM/yyyy HH:mm');

    sh.appendRow([
      quando,
      d.nome   || '',
      d.idade  || '',
      d.sexo   || '',
      d.genero || '',
      "'" + (d.tel || ''),   // aspa mantém o zero/DDD e evita virar número
      d.exame  || '',
      d.tipo   || '',
      d.lgpd ? 'Sim' : 'Não',
      d.origem || ''
    ]);

    // organiza a lista (por Nome, por padrão), mantendo o cabeçalho fixo
    var linhas = sh.getLastRow() - 1;
    if (linhas > 1) {
      sh.getRange(2, 1, linhas, CABECALHO.length).sort({ column: COLUNA_ORDENACAO, ascending: true });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Permite um teste rápido abrindo a URL no navegador (deve responder "Lumina OK").
function doGet() {
  return ContentService.createTextOutput('Lumina OK');
}
