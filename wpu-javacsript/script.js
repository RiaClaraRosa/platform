document.getElementById('dynamicForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const choices = document.getElementById('choices').value;
  document.getElementById('nameDisplay').textContent = name;
  document.getElementById('choicesContainer').innerHTML = '';

  for (let i = 1; i <= choices; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = `choice${i}`;
      input.placeholder = `Pilihan ${i}`;
      input.required = true;
      document.getElementById('choicesContainer').appendChild(input);
  }

  const profileImage = document.getElementById('profilePic').src; // Mendapatkan URL gambar profil
  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', function() {
      let choicesText = '';
      for (let i = 1; i <= choices; i++) {
          const choice = document.querySelector(`input[name="choice${i}"]`).value;
          choicesText += `, ${choice}`;
      }
      document.getElementById('result').textContent = `Hallo, nama saya ${name}, saya mempunyai sejumlah ${choices} pilihan yaitu ${choicesText.substring(2)}`;
      document.getElementById('profilePic').src = profileImage; // Setel kembali gambar profil setelah menampilkan hasil
  });
  document.getElementById('choicesContainer').appendChild(submitButton);
});

function previewProfileImage(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(){
      var dataURL = reader.result;
      var profileImage = document.getElementById('profilePic');
      profileImage.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]);
}
