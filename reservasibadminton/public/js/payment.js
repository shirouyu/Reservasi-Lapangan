// ======================
// PAYMENT METHOD
// ======================

const paymentRadios = document.querySelectorAll('input[name="payment"]');
const bankOptions = document.getElementById('bankOptions');
const ewalletOptions = document.getElementById('ewalletOptions');

paymentRadios.forEach(radio => {

    radio.addEventListener('change', () => {

        bankOptions.classList.add('hidden');
        ewalletOptions.classList.add('hidden');

        if (radio.value === 'Transfer') {
            bankOptions.classList.remove('hidden');
        }

        if (radio.value === 'EWallet') {
            ewalletOptions.classList.remove('hidden');
        }

    });

});

// ======================
// BOOKING DATA
// ======================
// NANTI GANTI DARI DATABASE
// SEKARANG DUMMY DULU

const bookingData = {
    venue: "KPMB Arena",
    lapangan: "Lapangan 1",
    tanggal: "15 Juni 2026",
    jam: "19:00 - 21:00",
    durasi: "2 Jam",
    harga: "Rp60.000"
};

document.getElementById("venue").textContent =
    bookingData.venue;

document.getElementById("lapangan").textContent =
    bookingData.lapangan;

document.getElementById("tanggal").textContent =
    bookingData.tanggal;

document.getElementById("jam").textContent =
    bookingData.jam;

document.getElementById("durasi").textContent =
    bookingData.durasi;

document.getElementById("harga").textContent =
    bookingData.harga;

// ======================
// PAJAK 11%
// ======================

const hargaAngka = 60000;

const pajak = hargaAngka * 0.11;

const total = hargaAngka + pajak;

document.getElementById("pajak").textContent =
    "Rp" + pajak.toLocaleString("id-ID");

document.getElementById("total").textContent =
    "Rp" + total.toLocaleString("id-ID");


// ======================
// VALIDASI
// ======================

const btnBayar =
    document.getElementById("btnBayar");

btnBayar.addEventListener("click", () => {

    const nama =
        document.getElementById("nama").value.trim();

    const hp =
        document.getElementById("hp").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const warningBox =
        document.getElementById("warningBox");

    if (
        nama === "" ||
        hp === "" ||
        email === ""
    ) {

        warningBox.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }

    warningBox.style.display = "none";

    // ======================
    // METODE PEMBAYARAN
    // ======================

    let metode =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;

    let detailPembayaran = "";

    if (metode === "Cash") {

        detailPembayaran =
            "Silahkan datang ke venue untuk melakukan pembayaran.";

    }

    else if (metode === "QRIS") {

        detailPembayaran =
            "QRIS-DUMMY-2026";

    }

    else if (metode === "Transfer") {

        const bankDipilih =
            document.querySelector(
                'input[name="bank"]:checked'
            );

        if (!bankDipilih) {
            alert("Pilih bank terlebih dahulu.");
            return;
        }

        metode =
            "Transfer " +
            bankDipilih.value;

        detailPembayaran =
            "1234567890 a.n KPMB Arena";

    }

    else if (metode === "EWallet") {

        const ewalletDipilih =
            document.querySelector(
                'input[name="ewallet"]:checked'
            );

        if (!ewalletDipilih) {
            alert("Pilih E-Wallet terlebih dahulu.");
            return;
        }

        metode =
            ewalletDipilih.value;

        detailPembayaran =
            "081234567890";

    }

    // ======================
    // JENIS PEMBAYARAN
    // ======================

    const jenisBayar =
        document.querySelector(
            'input[name="jenisBayar"]:checked'
        ).value;
        console.log(jenisBayar);

    // ======================
    // KODE BOOKING
    // ======================

    const kodeBooking =
        "BK-" +
        Date.now();

    // ======================
    // SIMPAN KE LOCALSTORAGE
    // ======================
    let totalBayar = total;
    if (jenisBayar === "Dp") {
        totalBayar = total * 0.5;
    }

    localStorage.setItem(
    "bookingData",
    JSON.stringify({

        kodeBooking,
        nama,
        hp,
        email,

        metode,
        detailPembayaran,

        jenisBayar,

        totalBayar:
            "Rp" +
            Math.round(totalBayar)
            .toLocaleString("id-ID"),

        venue: bookingData.venue,
        lapangan: bookingData.lapangan,
        tanggal: bookingData.tanggal,
        jam: bookingData.jam,
        durasi: bookingData.durasi,
        harga: bookingData.harga
    })
);

console.log(
    JSON.parse(
        localStorage.getItem("bookingData")
    )
);


    window.location.href =
        "/success";

});