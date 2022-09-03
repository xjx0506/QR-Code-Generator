const form = document.getElementById("generate_form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearUI();
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter an URL");
  } else {
    showSpinner();
    setTimeout(() => {
      //hide the spinner after 1s
      hideSpinner();
      //show the qrcode
      generateQR(url, size);

      setTimeout(() => {
        const saveURL = qr.querySelector("img").src;
        createSaveBtn(saveURL);
      }, 50);
    }, 1000);
  }
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById('save-link')
  if(saveBtn){
    saveBtn.remove()
  }
  

};
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};
const generateQR = (url, size) => {
  var qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = "Save";
  document.getElementById("generated").appendChild(link);
};
form.addEventListener("submit", onGenerateSubmit);
