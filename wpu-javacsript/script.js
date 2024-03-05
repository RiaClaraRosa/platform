const formAwal = document.getElementById('form-awal-submit');
const formPilihan = document.getElementById('form-pilihan-submit');
const namaInput = document.getElementById('nama');
const jmlInput = document.getElementById('jml');
const dynamicFields = document.getElementById('dynamic-fields');
const namaPilihan = document.getElementById('nama-pilihan');
const jmlPilihan = document.getElementById('jml-pilihan');
const halo = document.getElementById('halo');
const pilihan = document.getElementById('pilihan');

// Function to add dynamic text input fields
function addDynamicFields(jml) {
  dynamicFields.innerHTML = ""; // Clear existing fields
  for (let i = 1; i <= jml; i++) {
    const label = document.createElement('label');
    label.textContent = `Pilihan ${i}:`;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.name = `pilihan${i}`;
    input.required = true;
    
    dynamicFields.appendChild(label);
    dynamicFields.appendChild(input);
  }
}

// Handle initial form submission
formAwal.addEventListener('submit', function(event) {
  event.preventDefault();
  const nama = namaInput.value;
  const jml = parseInt(jmlInput.value);
  
  namaPilihan.textContent = `Nama: ${nama}`;
  jmlPilihan.textContent = `Jumlah Pilihan: ${jml}`;
  
  // Clear existing dynamic fields and add new ones
  addDynamicFields(jml);
});

// Handle form submission after text input
formPilihan.addEventListener('submit', function(event) {
  event.preventDefault();
  const pilihan = []; // Array to store user choices
  
  // Check if any text input field is empty
  for (let i = 1; i <= jml; i++) {
    const input = document.getElementById(`pilihan${i}`);
    if (!input.value) {
      alert("Harap isi semua pilihan teks!");
      return; // Prevent further execution if not all fields are filled
    }
    pilihan.push(input.value);
  }
  
  // Prompt user for choice format (radio or dropdown)
  const choiceType = prompt("Pilih format pilihan: 'radio' atau 'dropdown'?");
  if (choiceType === "radio") {
    // Create radio buttons
    dynamicFields.innerHTML = "";
    for (let i = 0; i < pilihan.length; i++) {
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'final_pilihan';
      radio.value = pilihan[i];
      
      const label = document.createElement('label');
      label.textContent = pilihan[i];
      
      dynamicFields.appendChild(radio);
      dynamicFields.appendChild(label);
      dynamicFields.appendChild(document.createElement('br'));
    }
  } else if (choiceType === "dropdown") {
    // Create dropdown
    const select = document.createElement('select');
    select.name = 'final_pilihan';
    
    const defaultOption = document.createElement('option');
    defaultOption.text = "Pilih...";
    defaultOption.value = "";
    select.appendChild(defaultOption);
    
    for (const option of pilihan) {
      const optionElement = document.createElement('option');
      optionElement.text = option;
      optionElement.value = option;
      select.appendChild(optionElement);
    }
    
    dynamicFields.innerHTML = "";
    dynamicFields.appendChild(select);
  } else {
    alert("Format pilihan tidak valid!");
    return; // Prevent further execution if user enters invalid format
  }
  
  // Handle final submission after choosing radio or dropdown option
  formPilihan.addEventListener('submit', function(event) {
    event.preventDefault();
    const finalPilihan = document.querySelector('input[name="final_pilihan"]:checked')?.value || document.getElementById('final_pilihan').value;
    
    if (!finalPilihan) {
      alert("Harap pilih salah satu pilihan!");
      return;
    }
    
    halo.textContent = `Hallo, nama saya ${nama}, saya mempunyai sejumlah ${jml} pilihan yaitu ${pilihan.join(', ')}`;
    pilihan.textContent = `dan saya memilih ${finalPilihan}`;
  });
});