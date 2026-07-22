(function(){
'use strict';

// ===== PASSWORD =====
var _PASSWORD='242628';

// ===== CONFIG =====
var SHEET_ID  ='1D9A-q2kAEpM6TX-V5jCvm2tPZYhv1V4Ia4o66K7tCis';
var PUB_ID    = '2PACX-1vSPN5fVv7WDj6hI8L2-Yp-B6noDOlTcDYxuAtaezKLr02kn8UStXylsyDxtN0DC5Wc0izT-KSFXKhsv';
var WARN_THRESHOLD = 5000;
var IMG_SHEET_ID = '1Uax84tRusV963wT4QvyHN3qpJ1zy7LQJ1pnO6H2eEPk';
var IMG_GID = 2002497747;

var I18 = {
  vi:{
    loading:'Dang tai du lieu...',live:'Live',
    tIn:'📥 TONG SKU IN MISSING',tOut:'📤 TONG SKU OUT MISSING',tPend:'⏳ TONG SKU CHUA OUT',
    chartTitle:'📊 Bieu do Missing theo ngay (ca thang)',
    leg1:'IN bin thuong',leg2:'IN > 5000 THB - canh bao do',leg3:'OUT MISSING',
    dIn:'📥 CHI TIET IN MISSING',dOut:'📤 CHI TIET OUT MISSING',dPend:'⏳ CHI TIET CHUA OUT',
    noteIn:'💡 Danh sach SKU da IN vao kho missing trong ky nay',
    noteOut:'💡 LUU Y: Chi tinh out missing cho SKU da in missing trong ky. Khong tinh gap giua 2 ky.',
    notePend:'💡 SKU co trong IN MISSING nhung chua co trong OUT MISSING. Van con nam trong kho missing.',
    empty:'Khong co du lieu',no:'Khong tim thay!',
    ok:'Da cap nhat!',pushed:'Da day!',noTick:'Chua tick dong nao!',
    checked:'Tick: ',
    imgTitle:'🖼️ Xem hinh anh',pushBtn:'📤 Day len Google Sheet',excelBtn:'📥 Xuat Excel',
    pushedInfo:' dong da tick',exportOk:'Da xuat file Excel!',notFound:'Khong tim thay SKU nay!',
    backBtn:'← Quay lai Dashboard',showing:' dong',searchPlaceholder:'Tim SKU, Ten san pham...',
    scanQty:'So luong',scanPrice:'Gia',
    clickHint:'Click xem chi tiet →',refresh:'🔄 Refresh',
    scan:'📷 Scan',scanTitle:'📷 Scan Barcode',scanHint:'Scan barcode bang sung hoac nhap SKU, nhan Enter',
    colImg:'Hinh',colSku:'SKU',colName:'Ten san pham',colPrice:'Don gia',colTotal:'Thanh tien',colFrom:'Kho nguon',colTo:'Kho dich',
    colQtyIn:'SL can OUT',colQtyOut:'SL da OUT',colQtyPend:'SL chua OUT ky nay',
    colDateIn:'Ngay IN',colDateOut:'Ngay OUT',
    labelStatus:'Trang thai',labelSKU:'SKU',labelTenSP:'Ten SP',labelSL:'So luong',labelDG:'Don gia',labelTT:'Thanh tien',labelNgayIN:'Ngay IN',labelNgayOUT:'Ngay OUT',labelKhoN:'Kho nguon',labelKhoD:'Kho dich',
    warn:'⚠ Canh bao: > 5000 THB'
  },
  en:{
    loading:'Loading...',live:'Live',
    tIn:'📥 TOTAL IN MISSING SKU',tOut:'📤 TOTAL OUT MISSING SKU',tPend:'⏳ TOTAL NOT YET OUT',
    chartTitle:'📊 Missing report by day (full month)',
    leg1:'IN normal',leg2:'IN > 5000 THB - red warning',leg3:'OUT MISSING',
    dIn:'📥 IN MISSING DETAIL',dOut:'📤 OUT MISSING DETAIL',dPend:'⏳ NOT YET OUT DETAIL',
    noteIn:'💡 SKUs moved INTO missing zone this period',
    noteOut:'💡 Only count OUT missing for SKUs that were IN-missing this period.',
    notePend:'💡 SKUs in IN MISSING but not yet in OUT MISSING.',
    empty:'No data',no:'Not found!',
    ok:'Refreshed!',pushed:'Pushed!',noTick:'No ticked!',
    checked:'Tick: ',
    imgTitle:'🖼️ View Image',pushBtn:'📤 Push to Google Sheet',excelBtn:'📥 Export Excel',
    pushedInfo:' ticked rows',exportOk:'Exported Excel!',notFound:'SKU not found!',
    backBtn:'← Back to Dashboard',showing:' rows',searchPlaceholder:'Search SKU, Product name...',
    scanQty:'Qty',scanPrice:'Price',
    clickHint:'Click to view detail →',refresh:'🔄 Refresh',
    scan:'📷 Scan',scanTitle:'📷 Scan Barcode',scanHint:'Scan or type SKU, press Enter',
    colImg:'Image',colSku:'SKU',colName:'Product name',colPrice:'Unit price',colTotal:'Amount',colFrom:'From warehouse',colTo:'To warehouse',
    colQtyIn:'Qty to OUT',colQtyOut:'Qty OUT',colQtyPend:'Qty not yet OUT',
    colDateIn:'IN Date',colDateOut:'OUT Date',
    labelStatus:'Status',labelSKU:'SKU',labelTenSP:'Product',labelSL:'Qty',labelDG:'Unit price',labelTT:'Amount',labelNgayIN:'IN Date',labelNgayOUT:'OUT Date',labelKhoN:'From',labelKhoD:'To',
    warn:'⚠ Warning: > 5000 THB'
  },
  th:{
    loading:'กำลังโหลด...',live:'Live',
    tIn:'📥 จำนวน SKU IN MISSING',tOut:'📤 จำนวน SKU OUT MISSING',tPend:'⏳ ยังไม่ OUT',
    chartTitle:'📊 รายงาน Missing ตามวัน (เดือนนี้)',
    leg1:'IN ปกติ',leg2:'IN > 5000 THB - แดง',leg3:'OUT MISSING',
    dIn:'📥 รายละเอียด IN MISSING',dOut:'📤 รายละเอียด OUT MISSING',dPend:'⏳ ยังไม่ OUT',
    noteIn:'💡 รายการ SKU ย้ายเข้าโซน missing',
    noteOut:'💡 นับเฉพาะ OUT ของ SKU ที่ IN ในงวดนี้',
    notePend:'💡 SKU IN missing แต่ยังไม่ OUT',
    empty:'ไม่มีข้อมูล',no:'ไม่พบ!',
    ok:'อัปเดต!',pushed:'ส่งแล้ว!',noTick:'ยังไม่ติ๊ก!',
    checked:'ติ๊ก: ',
    clickHint:'คลิกเพื่อดูรายละเอียด →',refresh:'🔄 รีเฟรช',
    scan:'📷 Scan',scanTitle:'📷 Scan Barcode',scanHint:'สแกนหรือพิมพ์ SKU กด Enter',
    colImg:'รูป',colSku:'SKU',colName:'ชื่อสินค้า',colPrice:'ราคาต่อหน่วย',colTotal:'จำนวนเงิน',colFrom:'คลังต้นทาง',colTo:'คลังปลายทาง',
    colQtyIn:'จำนวนที่ต้อง OUT',colQtyOut:'จำนวนที่ OUT แล้ว',colQtyPend:'จำนวนที่ยังไม่ OUT',
    colDateIn:'วันที่ IN',colDateOut:'วันที่ OUT',
    labelStatus:'สถานะ',labelSKU:'SKU',labelTenSP:'สินค้า',labelSL:'จำนวน',labelDG:'ราคาต่อหน่วย',labelTT:'จำนวนเงิน',labelNgayIN:'วันที่ IN',labelNgayOUT:'วันที่ OUT',labelKhoN:'จาก',labelKhoD:'ถึง',
    warn:'⚠ คำเตือน: > 5000 THB'
  }
};

var T = I18.vi;
var lang = 'vi';
var allIn=[], allOut=[], allPrev=[], allPend=[];
var imgMap={};
var locMap={}; // SKU → location string
var allInGrouped=[], allOutGrouped=[], allPendGrouped=[];
var summaryMetrics = {
  inQty: 0, inAmt: 0,
  gapQty: 0, gapAmt: 0,
  retQty: 0, retAmt: 0,
  netQty: 0, netAmt: 0
};
var checked={in:{},out:{},pending:{}};
var _periodOverride=null; // {start:Date, end:Date} or null for auto
var qr=null, chart=null, _chartDayFilter=null, _debugOutPeriod=0;
var detailType=null;
var periodInStart=null, periodInEnd=null;
var prevInStart=null, prevInEnd=null;
var gapStart=null, gapEnd=null;
var returnedStart=null, returnedEnd=null;
var periodLabel='';

function calcPeriods(){
  if(_periodOverride){
    periodInStart=new Date(_periodOverride.start);
    periodInEnd=new Date(_periodOverride.end);
    periodInEnd.setHours(23,59,59,999);
    // Prev IN = previous month 16th → 15th
    var py=periodInStart.getFullYear(), pm=periodInStart.getMonth()-1;
    if(pm<0){pm=11;py-=1;}
    prevInStart=new Date(py,pm,16,0,0,0,0);
    prevInEnd=new Date(periodInStart.getFullYear(),periodInStart.getMonth()-1,15,23,59,59,999);
    // Gap = same as current IN start → end of that month
    gapStart=new Date(periodInStart);
    gapEnd=new Date(periodInStart.getFullYear(),periodInStart.getMonth()+1,0,23,59,59,999);
    // Returned = 1st of next month → periodInEnd's month end
    returnedStart=new Date(periodInStart.getFullYear(),periodInStart.getMonth()+1,1,0,0,0,0);
    returnedEnd=new Date(periodInEnd.getFullYear(),periodInEnd.getMonth()+1,0,23,59,59,999);
    periodLabel=pad(periodInStart.getDate())+'/'+pad(periodInStart.getMonth()+1)+' → '+
      pad(periodInEnd.getDate())+'/'+pad(periodInEnd.getMonth()+1);
    return;
  }
  var now=new Date();
  var y=now.getFullYear(), m=now.getMonth();
  var baseM;
  if(now.getDate()>=16){
    baseM=m-1;
  } else {
    baseM=m-2;
  }
  if(baseM<0){
    baseM=12+baseM;
    y-=1;
  }
  
  // Current Period IN = 16th previous month → 15th current month
  periodInStart=new Date(y,baseM,16,0,0,0,0);
  periodInEnd=new Date(y,baseM+1,15,23,59,59,999);
  
  // Previous Period IN
  var prevY=y, prevM=baseM-1;
  if(prevM<0){prevM=11;prevY-=1;}
  prevInStart=new Date(prevY,prevM,16,0,0,0,0);
  prevInEnd=new Date(prevY,prevM+1,15,23,59,59,999);
  
  // Overlap (Gap) Period
  gapStart=new Date(y,baseM,16,0,0,0,0);
  gapEnd=new Date(y,baseM+1,0,23,59,59,999);
  
  // Returned Period (OUT in 1st → end of current month)
  returnedStart=new Date(y,baseM+1,1,0,0,0,0);
  returnedEnd=new Date(y,baseM+2,0,23,59,59,999); // 31/07
  
  periodLabel=pad(periodInStart.getDate())+'/'+pad(periodInStart.getMonth()+1)+' → '+
    pad(periodInEnd.getDate())+'/'+pad(periodInEnd.getMonth()+1);
}
function pad(n){return n<10?'0'+n:''+n;}
calcPeriods();

// ===== PERIOD PICKER =====
function openPeriodPicker(){
  document.getElementById('modalPeriod').classList.add('active');
  if(_periodOverride){
    document.getElementById('periodStartInput').value=_periodOverride.start.toISOString().split('T')[0];
    document.getElementById('periodEndInput').value=_periodOverride.end.toISOString().split('T')[0];
  } else {
    document.getElementById('periodStartInput').value='';
    document.getElementById('periodEndInput').value='';
  }
}
function closePeriodPicker(){document.getElementById('modalPeriod').classList.remove('active');}
function applyPeriod(){
  var s=document.getElementById('periodStartInput').value;
  var e=document.getElementById('periodEndInput').value;
  if(!s||!e){toast('Nhap ngay bat dau va ket thuc','error');return;}
  _periodOverride={start:new Date(s+'T00:00:00'),end:new Date(e+'T00:00:00')};
  closePeriodPicker();
  refresh();
}
function resetPeriod(){
  _periodOverride=null;
  closePeriodPicker();
  refresh();
}

// ===== HELPERS =====
function C(v){
  if(!v)return'0';
  var n=parseFloat(String(v).replace(/[^0-9.-]/g,''));
  return isNaN(n)?'0':n.toLocaleString('vi-VN');
}
function D(d){
  if(!d)return'-';
  try{
    var dt=parseGDate(d);
    if(!dt||isNaN(dt.getTime()))return d;
    return dt.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
  }catch(e){return d;}
}
function E(s){
  if(!s)return'';
  var d=document.createElement('div');
  d.textContent=s;
  return d.innerHTML;
}
function toast(msg,type){
  type=type||'success';
  var el=document.getElementById('toastEl');
  document.getElementById('toastMsg').textContent=msg;
  document.getElementById('toastIcon').textContent=type==='success'?'✓':type==='error'?'✕':'ℹ';
  el.className='toast '+type+' show';
  setTimeout(function(){el.classList.remove('show');},3000);
}
function imgOf(sku){
  var u=(sku&&imgMap[sku.toLowerCase()])||'';
  if(u&&u.indexOf('storage.googleapis.com')>0)
    u='https://cdn-th-cache-image.buymed.tech/img/img-proxy.thuocsi.vn/thuocsi-live/images/'+u.split('/').pop()+'?q=100&size=origin';
  return u;
}
function imgCell(sku){
  var u=imgOf(sku);
  if(u&&u.indexOf('http')===0)
    return '<img src="'+u+'" class="product-image" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><div class="image-placeholder" style="display:none">📷</div>';
  return '<div class="image-placeholder">📷</div>';
}
function sumAmt(arr){
  var s=0;
  for(var i=0;i<arr.length;i++)s+=parseFloat(arr[i].amt_moving)||0;
  return s;
}

// ===== COLUMN MAPPING =====
var COL_MAP={};
function buildColMap(headers){
  COL_MAP={};
  for(var i=0;i<headers.length;i++){
    var h=String(headers[i]).toLowerCase().replace(/^\./,'').trim();
    COL_MAP[h]=h;
  }
  var alias={
    'sku_code':['sku','sku code','ma sku','mã sku','sku_code','stock code','barcode','product code','sku code','code'],
    'product_name':['product name','ten san pham','tên sản phẩm','product_name','ten sp','tên sp','name','description','item name','san pham','sản phẩm'],
    'qty_moving':['qty moving','qty_moving','quantity','so luong','số lượng','qty','soluong','sl','so luong','số lượng'],
    'price_unit':['price unit','price_unit','unit price','don gia','đơn giá','price','dongia','unitprice'],
    'amt_moving':['amt moving','amt_moving','amount','thanh tien','thành tiền','total amount','total','amt','total_price','thanhtien'],
    'ts_created':['ts created','ts_created','ngay in','date in','created date','created','ngay nhap','ngày in','date','time','ngay','created at'],
    'ts_moving_done':['ts moving done','ts_moving_done','ngay out','date out','moving done','out date','ngay xuat','ngày out','done date','ngay out'],
    'area_from':['area from','area_from','kho nguon','kho nguồn','from','from warehouse','warehouse from','khonguon'],
    'area_to':['area to','area_to','kho dich','kho đích','to','to warehouse','warehouse to','khodich']
  };
  for(var key in alias){
    var arr=alias[key];
    for(var a=0;a<arr.length;a++){
      var ah=arr[a];
      if(COL_MAP[ah]!==undefined){COL_MAP[key]=ah;break;}
    }
  }
}

// ===== CSV PARSE =====
function csvLine(line){
  var cols=[],cur='',q=false;
  for(var i=0;i<line.length;i++){
    var ch=line.charAt(i);
    if(ch==='"')q=!q;
    else if(ch===','&&!q){cols.push(cur.replace(/""/g,'"').trim());cur='';}
    else cur+=ch;
  }
  cols.push(cur.replace(/""/g,'"').trim());
  return cols;
}
function csvParse(text){
  var lines=text.split('\n'),hdr=[],res=[],first=true;
  for(var i=0;i<lines.length;i++){
    var line=lines[i].trim();
    if(!line||line.indexOf('//')===0||line.indexOf('#')===0)continue;
    var cols=csvLine(line);
    if(!cols.length||cols.length<2)continue;
    if(first){
      first=false;
      for(var j=0;j<cols.length;j++)hdr.push(String(cols[j]).toLowerCase().replace(/^\./,'').trim());
      buildColMap(hdr);
    } else {
      var row={};
      for(var j=0;j<hdr.length;j++)row[hdr[j]]=cols[j]||'';
      res.push(row);
    }
  }
  return res;
}
function mapRow(row){
  var m={};
  for(var key in COL_MAP)if(COL_MAP[key])m[key]=row[COL_MAP[key]];
  return m;
}
function mapAll(arr){return arr.map(mapRow);}

// ===== FETCH (JSONP - khong can CORS) =====
function fetchSheet(gid,timeout){
  timeout=timeout||15000;
  return new Promise(function(resolve){
    var cb='gs_cb_'+Math.random().toString(36).substr(2,8);
    // Thêm cache-busting mạnh hơn với headers no-cache
    var ts=Date.now()+Math.random();
    var url='https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?tqx=out:json;responseHandler:'+cb+'&gid='+gid+'&_='+ts+'&nocache='+ts;
    window[cb]=function(r){
      try{
        if(!r||!r.table||!r.table.rows){resolve([]);return;}
        var cols=r.table.cols;
        var hdr=[], hdrClean=[];
        for(var c=0;c<cols.length;c++){
          var raw=String(cols[c].label||cols[c].id||'').toLowerCase().trim();
          hdr.push(raw);
          hdrClean.push(raw.replace(/^\./,''));
        }
        buildColMap(hdrClean);
        var rows=[];
        for(var ri=0;ri<r.table.rows.length;ri++){
          var cells=r.table.rows[ri].c;
          var row={};
          for(var c=0;c<cells.length&&c<hdrClean.length;c++){
            row[hdrClean[c]]=cells[c]&&cells[c].v!==null&&cells[c].v!==undefined?String(cells[c].v):'';
          }
          rows.push(row);
        }
        resolve(rows);
      }catch(e){resolve([]);}
    };
    var s=document.createElement('script');
    s.src=url+'&cb='+Date.now()+Math.random();
    s.onerror=function(){resolve([]);};
    document.body.appendChild(s);
    setTimeout(function(){resolve([]);},timeout);
  });
}

// ===== FETCH CSV (published - cache bypass) =====
function fetchPublishedCSV(gid){
  var url='https://docs.google.com/spreadsheets/d/e/'+PUB_ID+'/pub?gid='+gid+'&single=true&output=csv&cb='+Date.now();
  return fetch(url).then(function(r){
    if(!r.ok)throw new Error('HTTP '+r.status);
    return r.text();
  }).then(function(text){
    var lines=text.split('\n'),hdr=[],res=[],first=true;
    for(var i=0;i<lines.length;i++){
      var line=lines[i].trim();
      if(!line)continue;
      var cols=csvLine(line);
      if(!cols.length||cols.length<2)continue;
      if(first){
        first=false;
        hdr=cols.map(function(c){return String(c).toLowerCase().replace(/^\./,'').trim();});
        buildColMap(hdr);
      } else {
        var row={};
        for(var j=0;j<hdr.length;j++)row[hdr[j]]=cols[j]||'';
        // CSV uses '.' as thousand separator for numbers, strip them
        ['qty_moving','amt_moving','price_unit'].forEach(function(f){
          if(row[f]!==undefined)row[f]=String(row[f]).replace(/\./g,'');
        });
        res.push(row);
      }
    }
    return res;
  });
}

// ===== FETCH IMAGE + LOCATION SHEET =====
function fetchImageSheet(){
  return new Promise(function(resolve){
    var cb='icb_'+Math.random().toString(36).substr(2,8);
    var url='https://docs.google.com/spreadsheets/d/'+IMG_SHEET_ID+'/gviz/tq?tqx=out:json;responseHandler:'+cb+'&gid='+IMG_GID+'&_='+Date.now();
    window[cb]=function(r){
      try{
        if(!r||!r.table||!r.table.rows){resolve({});return;}
        var map={}, loc={};
        for(var ri=0;ri<r.table.rows.length;ri++){
          var cells=r.table.rows[ri].c;
          if(!cells||cells.length<9)continue;
          var sku=cells[1]&&cells[1].v?String(cells[1].v).trim():'';
          var img=cells[7]&&cells[7].v?String(cells[7].v).trim():'';
          var locStr=cells[8]&&cells[8].v?String(cells[8].v).trim():'';
          if(sku){
            if(img&&img.indexOf('http')===0)map[sku.toLowerCase()]=img;
            if(locStr)loc[sku.toLowerCase()]=locStr;
          }
        }
        resolve({imgs:map,locs:loc});
      }catch(e){resolve({imgs:{},locs:{}});}
    };
    var s=document.createElement('script');
    s.src=url+'&cb='+Date.now()+Math.random();
    s.onerror=function(){resolve({imgs:{},locs:{}});};
    document.body.appendChild(s);
    setTimeout(function(){resolve({imgs:{},locs:{}});},30000);
  });
}

// ===== PERIOD FILTER =====
function parseGDate(s){
  if(!s)return null;
  if(s instanceof Date)return s;
  // Google gviz format: Date(year,month,day,hour,min,sec) where month is 0-indexed
  var m=s.match(/^Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+),(\d+))?\)$/);
  if(m)return new Date(+m[1],+m[2],+m[3],+(m[4]||0),+(m[5]||0),+(m[6]||0));
  // US format: M/D/YYYY H:mm:ss AM/PM
  var m1=s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if(m1){
    var h=+m1[4];if(m1[7].toUpperCase()==='PM'&&h<12)h+=12;if(m1[7].toUpperCase()==='AM'&&h===12)h=0;
    return new Date(+m1[3],+m1[1]-1,+m1[2],h,+m1[5],+(m1[6]||0));
  }
  // Published CSV format: DD/MM/YYYY HH:MM
  var m2=s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if(m2){
    // If month > 12 then it's actually US MM/DD/YYYY, swap
    if(+m2[2]>12)return new Date(+m2[3],+m2[1]-1,+m2[2],+(m2[4]||0),+(m2[5]||0),+(m2[6]||0));
    return new Date(+m2[3],+m2[2]-1,+m2[1],+(m2[4]||0),+(m2[5]||0),+(m2[6]||0));
  }
  return new Date(s);
}
function filterByPeriod(data, dateField, start, end){
  return data.filter(function(r){
    var d=r[dateField]||'';
    if(!d)return false;
    var dt=parseGDate(d);
    if(!dt||isNaN(dt.getTime()))return false;
    return dt>=start&&dt<=end;
  });
}
function calculateMetrics(){
  allInGrouped=[];
  allOutGrouped=[];
  allPendGrouped=[];
  summaryMetrics={
    inQty:0,inAmt:0,
    gapQty:0,gapAmt:0,
    retQty:0,retAmt:0,
    netQty:0,netAmt:0
  };

  var skuMap={};
  function getOrCreateSku(sku, name, price){
    var key=String(sku).toLowerCase().trim();
    if(!skuMap[key]){
      skuMap[key]={
        sku_code:sku,
        product_name:name||'',
        price_unit:parseFloat(String(price).replace(/[^0-9.-]/g,''))||0,
        qty_in_curr:0,
        qty_in_prev:0,
        qty_out_gap:0,
        qty_out_returned:0,
        latest_date_in:null,
        latest_date_out:null,
        area_from:'',
        area_to:''
      };
    } else {
      if(name && !skuMap[key].product_name) skuMap[key].product_name=name;
      if(price && !skuMap[key].price_unit) skuMap[key].price_unit=parseFloat(String(price).replace(/[^0-9.-]/g,''))||0;
    }
    return skuMap[key];
  }

  // A. Parse IN current
  var curIn=filterByPeriod(allIn,'ts_created',periodInStart,periodInEnd);
  window._inPeriodCnt=curIn.length;
  curIn.forEach(function(r){
    if(!r.sku_code)return;
    var s=getOrCreateSku(r.sku_code, r.product_name, r.price_unit);
    s.qty_in_curr+=parseFloat(r.qty_moving)||0;
    s.area_to=r.area_to||s.area_to;
    var dt=parseGDate(r.ts_created);
    if(dt&&(!s.latest_date_in||dt>s.latest_date_in)){
      s.latest_date_in=dt;
    }
  });

  // B. Parse IN previous
  var prevIn=filterByPeriod(allPrev,'ts_created',prevInStart,prevInEnd).filter(function(r){
    return String(r.area_to).toLowerCase().trim()==='wh-missing';
  });
  prevIn.forEach(function(r){
    if(!r.sku_code)return;
    var s=getOrCreateSku(r.sku_code, r.product_name, r.price_unit);
    s.qty_in_prev+=parseFloat(r.qty_moving)||0;
  });

  // C. Parse OUT gap (16th → end of previous month) — covers prev IN first
  var gapOut=filterByPeriod(allOut,'ts_created',gapStart,gapEnd);
  // D. Parse OUT returned (1st → end of current month) — covers current IN
  var retOut=filterByPeriod(allOut,'ts_created',returnedStart,returnedEnd);

  // Merge for total count in period
  var outPeriod=gapOut.concat(retOut).filter(function(r,idx,self){
    return self.indexOf(r)===idx;
  });
  window._outPeriodCnt=gapOut.length+retOut.length;

  gapOut.forEach(function(r){
    if(!r.sku_code)return;
    var s=getOrCreateSku(r.sku_code, r.product_name, r.price_unit);
    s.qty_out_gap+=parseFloat(r.qty_moving)||0;
    s.area_from=r.area_from||s.area_from;
    var dt=parseGDate(r.ts_created);
    if(dt&&(!s.latest_date_out||dt>s.latest_date_out))s.latest_date_out=dt;
  });
  retOut.forEach(function(r){
    if(!r.sku_code)return;
    var s=getOrCreateSku(r.sku_code, r.product_name, r.price_unit);
    s.qty_out_returned+=parseFloat(r.qty_moving)||0;
    s.area_from=r.area_from||s.area_from;
    var dt=parseGDate(r.ts_created);
    if(dt&&(!s.latest_date_out||dt>s.latest_date_out))s.latest_date_out=dt;
  });

  // 2. Perform logic calculations for each SKU
  for(var key in skuMap){
    var r=skuMap[key];

    // Gap logic:
    // 1. Gap OUT covers prev IN first
    var used_for_prev=Math.min(r.qty_out_gap, r.qty_in_prev);
    var gap_left=Math.max(0, r.qty_out_gap - used_for_prev);
    // 2. Remaining gap OUT + returned OUT cover current IN
    var total_out_available=gap_left + r.qty_out_returned;
    var used_for_curr=r.qty_in_curr>0 ? Math.min(r.qty_in_curr, total_out_available) : 0;
    // Split used_for_curr into gap part and returned part
    var gap_used_for_curr=Math.min(gap_left, used_for_curr);
    var ret_used_for_curr=used_for_curr - gap_used_for_curr;
    var total_out_used=used_for_prev + used_for_curr;
    var qty_remaining=r.qty_in_curr - used_for_curr;

    r.qty_used_for_prev=used_for_prev;
    r.qty_gap_used_for_curr=gap_used_for_curr;
    r.qty_ret_used_for_curr=ret_used_for_curr;
    r.qty_out_used=total_out_used;
    r.qty_remaining=Math.max(0, qty_remaining);

    r.amt_in=r.qty_in_curr*r.price_unit;
    r.amt_out_used=total_out_used*r.price_unit;
    r.amt_remaining=r.qty_remaining*r.price_unit;

    // OUT MISSING Detail (only for SKUs with IN in period)
    var total_out=r.qty_out_gap + r.qty_out_returned;
    if(r.qty_in_curr>0 && total_out>0){
      allOutGrouped.push({
        sku_code:r.sku_code,
        product_name:r.product_name,
        qty_moving:total_out,
        price_unit:r.price_unit,
        amt_moving:total_out*r.price_unit,
        ts_moving_done:r.latest_date_out,
        area_from:r.area_from,
        area_to:r.area_to
      });
    }

    // IN-related groups
    if(r.qty_in_curr>0){
      // IN MISSING Detail
      allInGrouped.push({
        sku_code:r.sku_code,
        product_name:r.product_name,
        qty_moving:r.qty_in_curr,
        price_unit:r.price_unit,
        amt_moving:r.amt_in,
        ts_created:r.latest_date_in,
        area_from:r.area_from||'WH-MAIN',
        area_to:r.area_to||'WH-MISSING'
      });

      summaryMetrics.inQty+=r.qty_in_curr;
      summaryMetrics.inAmt+=r.amt_in;

      // gapQty = gap OUT used (for prev + for curr), retQty = returned OUT used
      summaryMetrics.gapQty+=used_for_prev + gap_used_for_curr;
      summaryMetrics.gapAmt+=(used_for_prev + gap_used_for_curr)*r.price_unit;
      summaryMetrics.retQty+=ret_used_for_curr;
      summaryMetrics.retAmt+=ret_used_for_curr*r.price_unit;

      // CHƯA OUT (Pending) Detail
      if(r.qty_remaining>0){
        allPendGrouped.push({
          sku_code:r.sku_code,
          product_name:r.product_name,
          qty_moving:r.qty_remaining,
          price_unit:r.price_unit,
          amt_moving:r.amt_remaining,
          ts_created:r.latest_date_in,
          area_from:r.area_from||'WH-MISSING',
          area_to:r.area_to||'WH-MAIN',
          _inQty:r.qty_in_curr,
          _outQty:total_out_used
        });
      }

      summaryMetrics.netQty+=r.qty_remaining;
      summaryMetrics.netAmt+=r.amt_remaining;
    }
  }

  // Sort lists by amount descending
  allInGrouped.sort(function(a,b){return b.amt_moving - a.amt_moving;});
  allOutGrouped.sort(function(a,b){return b.amt_moving - a.amt_moving;});
  allPendGrouped.sort(function(a,b){return b.amt_moving - a.amt_moving;});
}

// ===== DATA LOAD =====
async function refresh(){
  document.getElementById('loadingOverlay').classList.remove('hidden');
  // Ưu tiên dùng CSV thay vì gviz (CSV ít bị cache hơn)
  document.getElementById('statusText').textContent='Dang tai du lieu tu Google Sheet (CSV)...';
  try{
    var r=await Promise.all([
      fetchPublishedCSV(0),
      fetchPublishedCSV(398024906),
      fetchPublishedCSV(118375355).catch(function(){return [];})
    ]);
    allIn=mapAll(r[0]||[]);
    allOut=mapAll(r[1]||[]);
    allPrev=mapAll(r[2]||[]);
    if(!allIn.length||!allOut.length)throw new Error('Empty CSV');
  }catch(e){
    document.getElementById('statusText').textContent='CSV that bai, thu lai voi gviz...';
    try{
      var r=await Promise.all([
        fetchSheet(0),
        fetchSheet(398024906),
        fetchSheet(118375355,60000).catch(function(){return [];})
      ]);
      allIn=mapAll(r[0]||[]);
      allOut=mapAll(r[1]||[]);
      allPrev=mapAll(r[2]||[]);
    }catch(e2){allIn=[];allOut=[];allPrev=[];}
  }
  // Fetch images + locations
  try{
    var imgRes=await fetchImageSheet();
    imgMap=imgRes.imgs||{};
    locMap=imgRes.locs||{};
  }catch(e){imgMap={};locMap={};}
  var imgCount=Object.keys(imgMap).length;
  calcPeriods();
  calculateMetrics();
  document.getElementById('statusText').textContent='IN: '+allIn.length+' | OUT: '+allOut.length+' | PREV: '+allPrev.length+' | IMG: '+imgCount;
  // periodInfo removed
  updateStats();
  updateChart();
  document.getElementById('loadingOverlay').classList.add('hidden');
  document.getElementById('periodBtnLabel').textContent=_periodOverride?periodLabel:'Auto';
  toast(T.ok+' (IN:'+allIn.length+' / OUT:'+allOut.length+' / PREV:'+allPrev.length+')','success');

}

function formatDM(d){
  return d ? pad(d.getDate())+'/'+pad(d.getMonth()+1) : '';
}

function updateStats(){
  // Update 3 stat cards
  document.getElementById('countIn').textContent=allInGrouped.length;
  document.getElementById('amountIn').textContent=C(summaryMetrics.inAmt);
  document.getElementById('countOut').textContent=allOutGrouped.length;
  document.getElementById('amountOut').textContent=C(summaryMetrics.gapAmt + summaryMetrics.retAmt);
  document.getElementById('countPending').textContent=allPendGrouped.length;
  document.getElementById('amountPending').textContent=C(summaryMetrics.netAmt);

  // Update Period Summary Table
  document.getElementById('summaryPeriod').textContent=periodLabel;
  document.getElementById('sumInQty').textContent=C(summaryMetrics.inQty);
  document.getElementById('sumInAmt').textContent=C(summaryMetrics.inAmt);
  document.getElementById('sumGapQty').textContent=C(summaryMetrics.gapQty);
  document.getElementById('sumGapAmt').textContent=C(summaryMetrics.gapAmt);
  document.getElementById('sumRetQty').textContent=C(summaryMetrics.retQty);
  document.getElementById('sumRetAmt').textContent=C(summaryMetrics.retAmt);
  document.getElementById('sumNetQty').textContent=C(summaryMetrics.netQty);
  document.getElementById('sumNetAmt').textContent=C(summaryMetrics.netAmt);

  // Dynamic labels with dates
  var wordUsed = T.used || (lang==='vi'?'đã dùng':lang==='en'?'used':'ใช้แล้ว');
  var wordNet = T.netRemaining || (lang==='vi'?'💰 NET CÒN LẠI (Remaining)':lang==='en'?'💰 NET REMAINING':'💰 NET คงเหลือ');
  
  document.getElementById('sumInLabel').textContent='📥 IN MISSING ('+formatDM(periodInStart)+'–'+formatDM(periodInEnd)+')';
  document.getElementById('sumGapLabel').textContent='📤 OUT gap lastmonth ('+formatDM(gapStart)+'–'+formatDM(gapEnd)+', '+wordUsed+')';
  document.getElementById('sumRetLabel').textContent='📤 OUT returned ('+formatDM(returnedStart)+'–'+formatDM(returnedEnd)+', '+wordUsed+')';
  document.getElementById('sumNetLabel').textContent=wordNet;
}

// ===== CHART (period: start → min(end,today)) =====
function updateChart(){
  if(typeof Chart==='undefined')return;
  try{
  var ctx=document.getElementById('chartMissing').getContext('2d');
  var start=new Date(periodInStart);
  var inEnd=new Date(periodInEnd);        // IN chỉ đến 15/07
  var outEnd=new Date(returnedEnd);       // OUT đến 31/07
  var now=new Date();
  if(inEnd>now)inEnd=now;
  if(outEnd>now)outEnd=now;

  // Build per-day sums
  var dayIn={}, dayOut={};
  allIn.forEach(function(r){
    var dt=parseGDate(r.ts_created);
    if(!dt||dt<start||dt>inEnd)return;
    var key=dt.getFullYear()+'-'+dt.getMonth()+'-'+dt.getDate();
    dayIn[key]=(dayIn[key]||0)+(parseFloat(r.amt_moving)||0);
  });
  allOut.forEach(function(r){
    var dt=parseGDate(r.ts_moving_done);
    if(!dt||dt<start||dt>outEnd)return;
    var key=dt.getFullYear()+'-'+dt.getMonth()+'-'+dt.getDate();
    dayOut[key]=(dayOut[key]||0)+(parseFloat(r.amt_moving)||0);
  });

  var labels=[],inAmt=[],inColor=[],outAmt=[],dateKeys=[];
  var cur=new Date(start);
  var chartEnd=outEnd>inEnd?outEnd:inEnd;
  while(cur<=chartEnd){
    labels.push(cur.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit'}));
    dateKeys.push(new Date(cur));
    var key=cur.getFullYear()+'-'+cur.getMonth()+'-'+cur.getDate();
    var sIn=dayIn[key]||0;
    inAmt.push(sIn);
    inColor.push(sIn>WARN_THRESHOLD?'rgba(239,68,68,0.9)':'rgba(59,130,246,0.8)');
    outAmt.push(dayOut[key]||0);
    cur.setDate(cur.getDate()+1);
  }

  if(chart)chart.destroy();
  var self=this;
  chart=new Chart(ctx,{
    type:'bar',
    data:{
      labels:labels,
      datasets:[
        {label:'IN MISSING',data:inAmt,backgroundColor:inColor,borderRadius:3},
        {label:'OUT MISSING',data:outAmt,backgroundColor:'rgba(239,68,68,0.35)',borderRadius:3}
      ]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      onClick:function(e){
        var bars=chart.getElementsAtEventForMode(e,'index',{intersect:true},false);
        if(!bars||!bars.length)return;
        var idx=bars[0].index;
        var ds=bars[0].datasetIndex;
        var d=dateKeys[idx];
        var t=ds===0?'in':'out';
        showChartDayDetail(t,d);
      },
      scales:{
        x:{grid:{color:'#2a2a2a'},ticks:{color:'#888',maxTicksLimit:15}},
        y:{grid:{color:'#2a2a2a'},ticks:{color:'#888'},beginAtZero:true}
      },
      plugins:{
        legend:{labels:{color:'#888'}},
        tooltip:{
          callbacks:{
            afterLabel:function(ctx){
              if(ctx.datasetIndex===0&&inAmt[ctx.dataIndex]>WARN_THRESHOLD)return T.warn;
              return'';
            }
          }
        }
      }
    }
  });
  }catch(e){}
}

// ===== CHART BAR CLICK → show daily detail =====
function showChartDayDetail(type,dateObj){
  var raw=type==='in'?allIn:allOut;
  var dateField=type==='in'?'ts_created':'ts_moving_done';
  var filtered=[];
  raw.forEach(function(r){
    var dt=parseGDate(r[dateField]);
    if(dt&&dt.getFullYear()===dateObj.getFullYear()&&dt.getMonth()===dateObj.getMonth()&&dt.getDate()===dateObj.getDate())
      filtered.push(r);
  });
  if(!filtered.length)return;
  _chartDayFilter={type:type,data:filtered,date:dateObj};
  goDetail(type);
}
// ===== NAVIGATION =====
function goDetail(type){
  detailType=type;
  document.getElementById('pageMain').style.display='none';
  document.getElementById('pageDetail').style.display='block';

  // active card
  ['In','Out','Pending'].forEach(function(k){document.getElementById('card'+k).classList.remove('active');});
  document.getElementById('card'+type.charAt(0).toUpperCase()+type.slice(1)).classList.add('active');

  renderDetail();
  window.scrollTo(0,0);
}
function goBack(){
  document.getElementById('pageMain').style.display='block';
  document.getElementById('pageDetail').style.display='none';
  ['In','Out','Pending'].forEach(function(k){document.getElementById('card'+k).classList.remove('active');});
  detailType=null;
  window.scrollTo(0,0);
}

// ===== RENDER DETAIL TABLE =====
function renderDetail(){
  var type=detailType;
  var data;
  var chartFilter=_chartDayFilter;
  _chartDayFilter=null;
  if(chartFilter&&chartFilter.type===type){
    data=chartFilter.data;
  } else {
    data=type==='in'?allInGrouped:
      type==='out'?allOutGrouped:allPendGrouped;
  }
  var titles={in:T.dIn,out:T.dOut,pending:T.dPend};
  var notes={in:T.noteIn,out:T.noteOut,pending:T.notePend};

  document.getElementById('detailTitle').textContent=(chartFilter&&chartFilter.date?formatDM(chartFilter.date)+' — ':'')+titles[type];
  var badge=document.getElementById('detailBadge');
  badge.textContent=data.length+' '+T.colSku;
  badge.className='detail-badge '+type;

  document.getElementById('periodInfoDetail').textContent=periodLabel;
  document.getElementById('detailNote').innerHTML=notes[type];
  document.getElementById('detailNote').className=type==='in'?'detail-note-box':type==='out'?'detail-warn-box':'detail-warn-box';

  document.getElementById('pushInfo').textContent=Object.keys(checked[type]).length+T.pushedInfo;
  document.getElementById('btnExcel').onclick=function(){exportExcel(type);};
  document.getElementById('btnPush').onclick=function(){pushSheet(type);};
  document.getElementById('btnPush').style.display=type==='pending'?'none':'';

  var slH=type==='in'?T.colQtyIn:type==='out'?T.colQtyOut:T.colQtyPend;
  var dCol=type==='out'?'ts_moving_done':'ts_created';
  var dH=type==='out'?T.colDateOut:T.colDateIn;

  var extraCol=type==='pending'?'<th>IN Qty</th><th>OUT Qty</th>':'';
  document.getElementById('tblHead').innerHTML=
    '<th style="width:60px">'+T.colImg+'</th>'+
    '<th style="width:50px">✓</th>'+
    '<th>'+T.colSku+'</th><th>'+T.colName+'</th><th>'+slH+'</th>'+
    extraCol+
    '<th>'+T.colPrice+'</th><th>'+T.colTotal+'</th><th>'+dH+'</th>'+
    '';

  var body=document.getElementById('tblBody');
  var cols=type==='pending'?12:10;
  if(!data.length){body.innerHTML='<tr><td colspan="'+cols+'" class="empty-state">'+T.empty+'</td></tr>';return;}

  var rows=[];
  var max=Math.min(500,data.length);
  for(var i=0;i<max;i++){
    var r=data[i];
    var sku=r.sku_code||'-';
    var skuE=sku.replace(/'/g,"\\'");
    var chk=!!checked[type][sku];
    rows.push(
      '<tr class="'+(chk?'checked':'')+'" data-idx="'+i+'">'+
      '<td>'+imgCell(sku)+'</td>'+
      '<td class="checkbox-cell" onclick="event.stopPropagation();app.toggleChk(\''+type+'\',\''+skuE+'\',this)">'+
      '<input type="checkbox" class="checkbox-item"'+(chk?' checked':'')+'></td>'+
      '<td><strong>'+E(sku)+'</strong></td>'+
      '<td>'+E(r.product_name||'-')+'</td>'+
      '<td>'+C(r.qty_moving)+'</td>'+
      (type==='pending'?'<td style="color:#666">'+C(r._inQty||r.qty_moving)+'</td><td style="color:#f87171">'+C(r._outQty||0)+'</td>':'')+
      '<td>'+C(r.price_unit)+'</td>'+
      '<td>'+C(r.amt_moving)+'</td>'+
      '<td>'+D(r[dCol])+'</td>'+
      '</tr>'
    );
  }
  if(data.length>500)rows.push('<tr><td colspan="'+cols+'" style="text-align:center;color:#555;padding:14px">500/'+data.length+T.showing+'</td></tr>');
  body.innerHTML=rows.join('');

  body.onclick=function(e){
    var tr=e.target.closest('tr[data-idx]');
    if(!tr)return;
    if(e.target.tagName==='INPUT')return;
    var idx=parseInt(tr.getAttribute('data-idx'));
    showItem(type,idx);
  };
}

// ===== CHECK / UNCHECK =====
function toggleChk(type,sku,td){
  var el=td.querySelector('input');
  var tr=td.closest('tr');
  if(el.checked){
    checked[type][sku]=true;
    tr.classList.add('checked');
    toast(T.checked+sku,'success');
  } else {
    delete checked[type][sku];
    tr.classList.remove('checked');
  }
  document.getElementById('pushInfo').textContent=Object.keys(checked[type]).length+T.pushedInfo;
}

// ===== SHOW ITEM =====
function showItem(type,idx){
  var data=type==='in'?allInGrouped:
    type==='out'?allOutGrouped:allPendGrouped;
  var r=data[idx];
  if(!r)return;
  var bc=type;
  var bt=type==='in'?T.dIn:type==='out'?T.dOut:T.dPend;
  var u=imgOf(r.sku_code);
  var img=u&&u.indexOf('http')===0?'<img src="'+u+'" style="width:100%;height:100%;object-fit:cover">':'<div class="no-img">📷</div>';
  var amtVal=parseFloat(r.amt_moving)||0;
  var amtClass=amtVal>WARN_THRESHOLD?'value yellow':'value';
  document.getElementById('mdTitle').textContent='📦 '+r.sku_code;
  document.getElementById('mdBody').innerHTML=
    '<div class="detail-grid">'+
    '<div class="detail-img">'+img+'</div>'+
    '<div class="detail-fields">'+
    '<div class="detail-row"><div class="label">'+T.labelStatus+'</div><div class="value"><span class="detail-badge2 '+bc+'">'+bt+'</span></div></div>'+
    '<div class="detail-row"><div class="label">'+T.labelTenSP+'</div><div class="value">'+E(r.product_name||'-')+'</div></div>'+
    '<div class="detail-row"><div class="label">'+T.labelSKU+'</div><div class="value blue">'+E(r.sku_code||'-')+'</div></div>'+
    '<div class="detail-row"><div class="label">'+T.labelSL+'</div><div class="value">'+C(r.qty_moving)+'</div></div>'+
    (type==='out'?'<div class="detail-row"><div class="label">Qty OUT</div><div class="value">'+C(r.qty_moving)+'</div></div>':'')+
    (type==='pending'&&r._inQty?'<div class="detail-row"><div class="label">IN Qty</div><div class="value">'+C(r._inQty)+'</div></div>':'')+
    (type==='pending'?'<div class="detail-row"><div class="label">OUT Qty</div><div class="value" style="color:#f87171">'+C(r._outQty||0)+'</div></div>':'')+
    '<div class="detail-row"><div class="label">'+T.labelDG+'</div><div class="value">'+C(r.price_unit)+' THB</div></div>'+
    '<div class="detail-row"><div class="label">'+T.labelTT+'</div><div class="'+amtClass+'">'+C(r.amt_moving)+' THB'+(amtVal>WARN_THRESHOLD?' ⚠️':'')+'</div></div>'+
    '<div class="detail-row"><div class="label">'+T.labelNgayIN+'</div><div class="value">'+(r.ts_created ? D(r.ts_created) : '-')+'</div></div>'+
    (type==='out'?'<div class="detail-row"><div class="label">'+T.labelNgayOUT+'</div><div class="value">'+(r.ts_moving_done ? D(r.ts_moving_done) : '-')+'</div></div>':'')+
    (locMap[sku.toLowerCase()]?'<div class="detail-row"><div class="label">Ton kho</div><div class="value" style="color:var(--success)">'+E(locMap[sku.toLowerCase()])+'</div></div>':'')+
    '</div></div>';
  document.getElementById('modalDetail').classList.add('active');
}
function closeDetail(){document.getElementById('modalDetail').classList.remove('active');}
function previewImg(url){document.getElementById('mdImg').src=url;document.getElementById('modalImg').classList.add('active');}



// ===== PUSH TO SHEET =====
function pushSheet(type){
  var chk=checked[type];
  var data=type==='in'?allInGrouped:type==='out'?allOutGrouped:allPendGrouped;
  var ticked=[];
  for(var i=0;i<data.length;i++)if(chk[data[i].sku_code])ticked.push(data[i]);
  if(!ticked.length){toast(T.noTick,'error');return;}
  var dCol=type==='out'?'ts_moving_done':'ts_created';
  var csv='sku_code,product_name,qty_moving,amt_moving,price_unit,date,type,pushed_at\n';
  for(var i=0;i<ticked.length;i++){
    var r=ticked[i];
    csv+=[r.sku_code,r.product_name,r.qty_moving,r.amt_moving,r.price_unit,D(r[dCol]),type,new Date().toISOString()].join(',')+'\n';
  }
  try{navigator.clipboard.writeText(csv);}catch(e){}
  var blob=new Blob([csv],{type:'text/csv'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='PUSH_'+type.toUpperCase()+'_'+new Date().toISOString().split('T')[0]+'.csv';
  a.click();
  toast(T.pushed+' ('+ticked.length+' rows)','success');
  checked[type]={};
  if(detailType===type)renderDetail();
}

// ===== EXPORT EXCEL =====
function exportExcel(type){
  if(typeof XLSX==='undefined'){toast('Excel export not available (blocked by browser)','error');return;}
  var data=type==='in'?allInGrouped:type==='out'?allOutGrouped:allPendGrouped;
  if(!data.length){toast(T.empty,'error');return;}
  var slH=type==='in'?'SL can OUT':type==='out'?'SL da OUT':'SL chua OUT';
  var dCol=type==='out'?'ts_moving_done':'ts_created';
  var dH=type==='out'?'Ngay OUT':'Ngay IN';
  var hdr=[{SKU:'',Ten:T.colName,SL:slH,DonGia:T.colPrice,ThanhTien:T.colTotal,Ngay:dH,KhoN:T.colFrom,KhoD:T.colTo}];
  for(var i=0;i<data.length;i++){
    var r=data[i];
    hdr.push({SKU:r.sku_code,Ten:r.product_name,SL:r.qty_moving,DonGia:r.price_unit,ThanhTien:r.amt_moving,Ngay:D(r[dCol]),});
  }
  try{
  var ws=XLSX.utils.json_to_sheet(hdr);
  var wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,type.toUpperCase());
  XLSX.writeFile(wb,'MISSING_'+type.toUpperCase()+'_'+new Date().toISOString().split('T')[0]+'.xlsx');
  toast(T.exportOk,'success');
  }catch(e){toast('Excel export failed','error');}
}

// ===== LANGUAGE =====
function setLang(l){
  lang=l;T=I18[l]||I18.vi;
  document.getElementById('langSel').value=l;
  document.getElementById('loadingText').textContent=T.loading;
  document.getElementById('liveText').textContent=T.live;
  document.getElementById('chartTitle').textContent=T.chartTitle;
  document.getElementById('leg1').textContent=T.leg1;
  document.getElementById('leg2').textContent=T.leg2;
  document.getElementById('leg3').textContent=T.leg3;
  document.getElementById('titleIn').textContent=T.tIn;
  document.getElementById('titleOut').textContent=T.tOut;
  document.getElementById('titlePending').textContent=T.tPend;
  document.getElementById('searchInput').placeholder=T.searchPlaceholder;
  document.getElementById('scanBtn').innerHTML=T.scan;
  document.getElementById('scanTitle').textContent=T.scanTitle;
  document.getElementById('scanHint').textContent=T.scanHint;
  document.getElementById('scanInput').placeholder='SKU...';
  document.getElementById('backBtn').innerHTML=T.backBtn;
  document.getElementById('imgTitle').textContent=T.imgTitle;
  document.getElementById('excelIn').innerHTML=T.excelBtn;
  document.getElementById('excelOut').innerHTML=T.excelBtn;
  document.getElementById('excelPend').innerHTML=T.excelBtn;
  document.getElementById('btnExcel').innerHTML=T.excelBtn;
  document.getElementById('btnPush').innerHTML=T.pushBtn;
  document.getElementById('refreshBtn').innerHTML=T.refresh;
  document.getElementById('hintIn').textContent=T.clickHint;
  document.getElementById('hintOut').textContent=T.clickHint;
  document.getElementById('hintPend').textContent=T.clickHint;
  
  var sumTitleText = lang==='vi'?'📊 Bảng tổng hợp dữ liệu kỳ này':lang==='en'?'📊 Period Summary Table':'📊 ตารางสรุปข้อมูลรอบนี้';
  document.getElementById('sumTitle').textContent=sumTitleText;
  
  updateStats();
  if(detailType)renderDetail();
}

// ===== SCAN (sung barcode / nhap tay) =====
function scanLookup(text){
  text=String(text).trim();
  if(!text)return;
  document.getElementById('qrResult').style.display='block';
  document.getElementById('qrSku').textContent=text;
  var found=null,fIn='';
  var types=['in','out','pending'];
  var lbls={in:T.tIn,out:T.tOut,pending:T.tPend};
  outer:for(var ti=0;ti<types.length;ti++){
    var ty=types[ti];
    var arr=ty==='in'?allInGrouped:ty==='out'?allOutGrouped:allPendGrouped;
    for(var ri=0;ri<arr.length;ri++){
      if(String(arr[ri].sku_code)===text){found=arr[ri];fIn=lbls[ty];break outer;}
    }
  }
  if(found){
    var u=imgOf(found.sku_code);
    var ih=u&&u.indexOf('http')===0?'<img src="'+u+'" style="width:80px;height:80px;border-radius:8px;margin-bottom:8px;display:block">':'';
    document.getElementById('qrInfo').innerHTML=ih+
      '<strong>'+E(found.product_name||'-')+'</strong><br>'+
      T.scanQty+': '+(found.qty_moving||0)+' | '+T.scanPrice+': '+C(found.price_unit)+' THB<br>'+
      T.labelStatus+': '+fIn;
  } else {
    document.getElementById('qrInfo').innerHTML='<span style="color:#f87171">'+T.notFound+'</span>';
  }
}
function openQR(){
  document.getElementById('modalQR').classList.add('active');
  document.getElementById('qrResult').style.display='none';
  var inp=document.getElementById('scanInput');
  inp.value='';
  inp.focus();
  inp.onkeypress=function(e){
    if(e.key==='Enter')scanLookup(inp.value);
  };
}
function closeQR(){
  document.getElementById('modalQR').classList.remove('active');
  document.getElementById('qrResult').style.display='none';
}

// ===== SEARCH =====
document.getElementById('searchInput').addEventListener('keypress',function(e){
  if(e.key!=='Enter')return;
  var term=e.target.value.toLowerCase().trim();
  if(!term)return;
  var types=['in','out','pending'];
  for(var ti=0;ti<types.length;ti++){
    var arr=types[ti]==='in'?allInGrouped:types[ti]==='out'?allOutGrouped:allPendGrouped;
    for(var ri=0;ri<arr.length;ri++){
      var sku=String(arr[ri].sku_code||'').toLowerCase();
      var name=String(arr[ri].product_name||'').toLowerCase();
      if(sku.indexOf(term)>=0||name.indexOf(term)>=0){
        goDetail(types[ti]);
        return;
      }
    }
  }
  toast(T.no,'error');
});

// ===== THEME TOGGLE =====
function toggleTheme(){
  var b=document.body;
  if(b.classList.contains('light')){
    b.classList.remove('light');
    localStorage.setItem('theme','dark');
  }else{
    b.classList.add('light');
    localStorage.setItem('theme','light');
  }
}

// ===== UNLOCK =====
function unlock(){
  var pwd=document.getElementById('lockInput').value;
  if(pwd===_PASSWORD){
    document.getElementById('lockOverlay').style.display='none';
    var saved=localStorage.getItem('theme');if(saved==='light')document.body.classList.add('light');setLang('vi');
    refresh();
  } else {
    document.getElementById('lockError').style.display='block';
  }
}
document.getElementById('lockInput').addEventListener('keydown',function(e){if(e.key==='Enter')unlock();});

// ===== INIT =====
document.addEventListener('DOMContentLoaded',function(){
  var saved=localStorage.getItem('theme');if(saved==='light')document.body.classList.add('light');setLang('vi');
  // wait for unlock
});

// ===== EXPORT APP =====
window.app={
  setLang:setLang,refresh:refresh,
  goDetail:goDetail,goBack:goBack,
  showItem:showItem,toggleChk:toggleChk,
  pushSheet:pushSheet,exportExcel:exportExcel,
  openQR:openQR,closeQR:closeQR,
  closeDetail:closeDetail,previewImg:previewImg,toggleTheme:toggleTheme,unlock:unlock,
  openPeriodPicker:openPeriodPicker,closePeriodPicker:closePeriodPicker,
  applyPeriod:applyPeriod,resetPeriod:resetPeriod
};
})();
