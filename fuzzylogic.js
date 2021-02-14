/**
 * Logika Fuzzy (Kecerdasan Buatan)
 * @author Widdy Arfiansyah 1830511012
 */

const Ipk = function (hasil) {
  this.hasil = hasil;
};

Ipk.prototype.buruk = function (x, b = 0, c = 2.0, d = 2.75) {
  if ((x <= b) || (x > d)) this.hasil = 0;
  else if ((b <= x) && (x <= c)) this.hasil = 1;
  else if ((c < x) && (x <= d)) this.hasil = -(x - d) / (d - c);

  return this.hasil;
};

Ipk.prototype.cukup = function (x, a = 2.0, b = 2.75, c = 3.25) {
  if ((x <= a) || (x >= c)) this.hasil = 0;
  else if ((a < x) && (x <= b)) this.hasil = (x - a) / (b - a);
  else if ((b < x) && (x <= c)) this.hasil = -(x - c) / (c - b);

  return this.hasil;
};

Ipk.prototype.bagus = function (x, a = 2.75, b = 3.25, c = 4.0) {
  if ((x <= a) || (x > c)) this.hasil = 0;
  else if ((a <= x) && (x <= b)) this.hasil = (x - a) / (b - a);
  else if ((b < x) && (x <= c)) this.hasil = 1;

  return this.hasil;
};

const Gaji = function (hasil) {
  this.hasil = hasil;
};

Gaji.prototype.kecil = function (x, b = 0, c = 1, d = 3) {
  if ((x <= b) || (x > d)) this.hasil = 0;
  else if ((b <= x) && (x <= c)) this.hasil = 1;
  else if ((c < x) && (x <= d)) this.hasil = -(x - d) / (d - c);

  return this.hasil;
};

Gaji.prototype.sedang = function (x, a = 1, b = 3, c = 4, d = 6) {
  if ((x <= a) || (x >= d)) this.hasil = 0;
  else if ((a < x) && (x < b)) this.hasil = (x - a) / (b - a);
  else if ((b <= x) && (x <= c)) this.hasil = 1;
  else if ((c < x) && (x <= d)) this.hasil = -(x - d) / (d - c);

  return this.hasil;
};

Gaji.prototype.besar = function (x, a = 4, b = 6, c = 7, d = 12) {
  if ((x <= a) || (x >= d)) this.hasil = 0;
  else if ((a < x) && (x < b)) this.hasil = (x - a) / (b - a);
  else if ((b <= x) && (x <= c)) this.hasil = 1;
  else if ((c < x) && (x <= d)) this.hasil = -(x - d) / (d - c);

  return this.hasil;
};

Gaji.prototype.sangatBesar = function (x, a = 7, b = 12, c = b) {
  if ((x <= a || x > c)) this.hasil = 0;
  else if ((a <= x) && (x <= b)) this.hasil = (x - a) / (b - a);
  else if ((b < x) && (x <= c)) this.hasil = 1;

  return this.hasil;
};

const Linear = function (hasil) {
  this.hasil = hasil
}

Linear.prototype.linearNaik = function (x, a = 50, b = 80) {
  if ((x < a)) this.hasil = 0;
  else if ((x => a) && (x <= b)) this.hasil = (x - a) / (b - a);
  else if ((x > b)) this.hasil = 1;

  return this.hasil;
}
Linear.prototype.linearTurun = function (x, a = 50, b = 80) {
  if ((x < a)) this.hasil = 1;
  else if ((x => a) && (x <= b)) this.hasil = (b - x) / (b - a);
  else if ((x > b)) this.hasil = 0;

  return this.hasil;
}
export { Ipk, Gaji, Linear };
