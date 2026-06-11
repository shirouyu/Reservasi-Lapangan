const bookingData =
    JSON.parse(
        localStorage.getItem("bookingData")
    );

// =====================
// JIKA DATA TIDAK ADA
// =====================

if (!bookingData) {

    alert(
        "Data booking tidak ditemukan!"
    );

    window.location.href =
        "/payment";

}

// =====================
// TAMPILKAN DATA
// =====================

document.getElementById(
    "kodeBooking"
).textContent =
    bookingData.kodeBooking;

document.getElementById(
    "nama"
).textContent =
    bookingData.nama;

document.getElementById(
    "venue"
).textContent =
    bookingData.venue;

document.getElementById(
    "lapangan"
).textContent =
    bookingData.lapangan;

document.getElementById(
    "tanggal"
).textContent =
    bookingData.tanggal;

document.getElementById(
    "jam"
).textContent =
    bookingData.jam;

document.getElementById(
    "durasi"
).textContent =
    bookingData.durasi;

document.getElementById(
    "jenisBayar"
).textContent =
    bookingData.jenisBayar;

document.getElementById(
    "totalBayar"
).textContent =
    bookingData.totalBayar;

document.getElementById(
    "metode"
).textContent =
    bookingData.metode;

// =====================
// DETAIL PEMBAYARAN
// =====================

const detail =
    document.getElementById(
        "detailPembayaran"
    );

// CASH

if (
    bookingData.metode ===
    "Cash"
) {

    detail.innerHTML =
        `
        Silahkan datang ke venue
        untuk melakukan pembayaran
        secara langsung.
        `;

}

// QRIS

else if (
    bookingData.metode ===
    "QRIS"
) {

    detail.innerHTML =
        `
        <div style="
            text-align:center;
        ">

            <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=KPMB-DUMMY"
            style="
                width:220px;
                border-radius:10px;
            ">

            <p style="
                margin-top:10px;
            ">
                QRIS Dummy Demo
            </p>

        </div>
        `;

}

// TRANSFER

else if (
    bookingData.metode.includes(
        "Transfer"
    )
) {

    detail.innerHTML =
        `
        <strong>
            Nomor Rekening
        </strong>
        <br><br>

        ${bookingData.detailPembayaran}

        <br><br>

        a.n KPMB Arena
        `;

}

// E-WALLET

else {

    detail.innerHTML =
        `
        <strong>
            Nomor E-Wallet
        </strong>
        <br><br>

        ${bookingData.detailPembayaran}
        `;
}

// =====================
// DEBUG
// =====================

console.log(
    "Booking Data:",
    bookingData
);