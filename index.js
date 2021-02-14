/**
 * Logika Fuzzy (Kecerdasan Buatan)
 * @author Widdy Arfiansyah 1830511012
 */

import { Ipk, Gaji, Linear } from "./fuzzylogic.js"; // Import Logic fuzzy

// Instance
const objIpk = new Ipk(null);
const objGaji = new Gaji(null);
const objLinear = new Linear(null);

// Init
const btnSave = document.querySelector("#btnSave");
const nama = document.querySelector('[name="nama"]');
const nim = document.querySelector('[name="nim"]');
const ipk = document.querySelector('[name="ipk"]');
const gaji = document.querySelector('[name="gaji"]');
const showMhs = document.querySelector("#showDataMhs");

const kelayakanMam = x => {
  return {
    "rendah": objLinear.linearTurun(x),
    "tinggi": objLinear.linearNaik(x)
  };
}
const kelayakanSug = () => {
  return {
    "rendah": 50,
    "tinggi": 80
  };
}

const aturanNK = () => {
  let NK = [];
  let rendah = [];
  let tinggi = [];
  let nilai = 0;
  const buruk = objIpk.buruk(ipk.value).toFixed(2);
  const cukup = objIpk.cukup(ipk.value).toFixed(2);
  const bagus = objIpk.bagus(ipk.value).toFixed(2);

  const kecil = objGaji.kecil(gaji.value).toFixed(2);
  const sedang = objGaji.sedang(gaji.value).toFixed(2);
  const besar = objGaji.besar(gaji.value).toFixed(2);
  const sBesar = objGaji.sangatBesar(gaji.value).toFixed(2);

  if (ipk.value <= 2.75 && gaji.value <= 3) {
    nilai = Math.min(buruk, kecil);
    rendah.push(nilai);
    NK.push(' Rendah = ' + nilai)
  }
  if (ipk.value <= 2.75 && gaji.value >= 1 && gaji.value <= 6) {
    nilai = Math.min(buruk, sedang);
    rendah.push(nilai);
    NK.push(' Rendah = ' + nilai)
  }
  if (ipk.value <= 2.75 && gaji.value >= 4 && gaji.value <= 12) {
    nilai = Math.min(buruk, besar);
    rendah.push(nilai);
    NK.push(' Rendah = ' + nilai)
  }
  if (ipk.value <= 2.75 && gaji.value >= 7) {
    nilai = Math.min(buruk, sBesar);
    rendah.push(nilai);
    NK.push(' Rendah = ' + nilai)
  }
  if (ipk.value >= 2.00 && ipk.value <= 3.25 && gaji.value <= 3) {
    nilai = Math.min(cukup, kecil);
    tinggi.push(nilai);
    NK.push(' Tinggi = ' + nilai)
  }
  if (ipk.value >= 2.00 && ipk.value <= 3.25 && gaji.value >= 1 && gaji.value <= 6) {
    nilai = Math.min(cukup, sedang);
    rendah.push(nilai);
    NK.push(' Rendah = ' + nilai)
  }
  if (ipk.value >= 2.00 && ipk.value <= 3.25 && gaji.value >= 4 && gaji.value <= 12) {
    nilai = Math.min(cukup, besar);
    rendah.push(nilai);
    NK.push(' Rendah = ' + nilai);
  }
  if (ipk.value >= 2.00 && ipk.value <= 3.25 && gaji.value >= 7) {
    nilai = Math.min(cukup, sBesar);
    rendah.push(nilai);
    NK.push(' Rendah = ' + nilai)
  }
  if (ipk.value >= 2.75 && gaji.value <= 3) {
    nilai = Math.min(bagus, kecil);
    tinggi.push(nilai);
    NK.push(' Tinggi = ' + nilai)
  }
  if (ipk.value >= 2.75 && gaji.value >= 1 && gaji.value <= 6) {
    nilai = Math.min(bagus, sedang);
    tinggi.push(nilai);
    NK.push(' Tinggi = ' + nilai)
  }
  if (ipk.value >= 2.75 && gaji.value >= 4 && gaji.value <= 12) {
    nilai = Math.min(bagus, besar);
    tinggi.push(nilai);
    NK.push(' Tinggi = ' + nilai)
  }
  if (ipk.value >= 2.75 && gaji.value >= 7) {
    nilai = Math.min(bagus, sBesar);
    rendah.push(nilai);
    NK.push(' Rendah = ' + nilai)
  }
  // Perhitungan Nilai Kelayakan (Konjungsi & Disjungsi)
  let nAkhirRendah = Math.max(...rendah) == -Infinity ? 0 : Math.max(...rendah);
  let nAkhirTinggi = Math.max(...tinggi) == -Infinity ? 0 : Math.max(...tinggi);
  document.querySelector('#hak').innerHTML = `Nilai Kelayakan : Rendah (${nAkhirRendah}) <br> Nilai Kelayakan : Tinggi (${nAkhirTinggi})`;
  document.querySelector('#kd').innerHTML = `Rendah ${nAkhirRendah}, Tinggi ${nAkhirTinggi}`;
  document.querySelector('#keputusan').innerHTML = `jadi ${nama.value} dengan IPK = ${ipk.value} dan Gaji orangtuanya sebesar ${gaji.value} juta rupiah perbulan memperolah Nilai kelayakan sebesar ${perhitunganSugeno(nAkhirTinggi, nAkhirRendah).toFixed(2)} dan ${perhitunganMamdani(nAkhirTinggi, nAkhirRendah).toFixed(2)}`
  // Perhitungan Mamdani
  perhitunganMamdani(nAkhirTinggi, nAkhirRendah);
  // Perhitungan Sugeno
  perhitunganSugeno(nAkhirTinggi, nAkhirRendah);

  return NK;
}

// Mamdani
const perhitunganMamdani = (tinggi, rendah) => {
  let a = 0
  let b = 0
  for (let i = 10; i <= 100; i += 10) {
    let layak = kelayakanMam(i)
    let nilaiTertinggi = Math.max(Math.min(layak.rendah, rendah), Math.min(layak.tinggi, tinggi));
    a += i * nilaiTertinggi;
    b += nilaiTertinggi;
  }
  const nilaiMamdani = a / b;
  document.querySelector('#mamdani').innerHTML = nilaiMamdani.toFixed(2);
  return nilaiMamdani;
}

// Sugeno
const perhitunganSugeno = (tinggi, rendah) => {
  let layak = kelayakanSug();
  let nilaiSugeno = (layak.rendah * rendah) + (layak.tinggi * tinggi);
  nilaiSugeno = nilaiSugeno / (rendah + tinggi);
  document.querySelector('#sugeno').innerHTML = nilaiSugeno.toFixed(2);
  return nilaiSugeno;
}

// Get IPK
const dataIpk = () => {
  const buruk = objIpk.buruk(ipk.value).toFixed(2);
  const cukup = objIpk.cukup(ipk.value).toFixed(2);
  const bagus = objIpk.bagus(ipk.value).toFixed(2);
  let results = `<ul>
                    ${buruk <= 0 ? "" : `<li>IPK Buruk : ${buruk} </li>`}
                    ${cukup <= 0 ? "" : `<li>IPK Cukup : ${cukup} </li>`}
                    ${bagus <= 0 ? "" : `<li>IPK Bagus : ${bagus} </li>`}
                </ul>`;
  return results;
};

// Get Gaji
const dataGaji = () => {
  const kecil = objGaji.kecil(gaji.value).toFixed(2);
  const sedang = objGaji.sedang(gaji.value).toFixed(2);
  const besar = objGaji.besar(gaji.value).toFixed(2);
  const sBesar = objGaji.sangatBesar(gaji.value).toFixed(2);
  let results = `<ul>
                    ${kecil <= 0 ? "" : `<li> Nilai Gaji Ortu Kecil  : ${kecil} </li>`}
                    ${sedang <= 0 ? "" : `<li> Nilai Gaji Ortu Sedang : ${sedang} </li>`}
                    ${besar <= 0 ? "" : `<li> Nilai Gaji Ortu Besar : ${besar} </li>`}
                    ${sBesar <= 0 ? "" : `<li> Nilai Gaji Ortu Sangat Besar : ${sBesar} </li>`}
                </ul>`;
  return results;
};

// If Button clicked
btnSave.addEventListener("click", () => {
  // Check if value is null
  if (nama.value == "" || nim.value == "" || ipk.value == "" || gaji.value == "") {
    document.querySelector("#alerts").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">Jangan ada yang kosong!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;
  } else {
    showMhs.style.display = "block";
    document.querySelector("#alerts").innerHTML = "";

    document.querySelector("#nama").innerHTML = nama.value;
    document.querySelector("#nim").innerHTML = nim.value;
    document.querySelector("#curIpk").innerHTML = ipk.value;
    document.querySelector("#curGaji").innerHTML = gaji.value + " juta";

    document.querySelector("#ipk").innerHTML = dataIpk();
    document.querySelector("#gaji").innerHTML = dataGaji();

    document.querySelector('#nk').innerHTML = aturanNK();
  }
});
