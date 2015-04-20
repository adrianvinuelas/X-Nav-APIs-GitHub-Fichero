var repoHTML = "User: <input type='text' name='user' " +
    "id='user' size='10' />" +
    "Repo: <input type='text' name='repo' " +
    "id='repo' size='10' />" +
    "<button type='button' id='botonform'>Grab repo data</button>" +
    "<div id='repodata'/>";


rellenarformulario= function rellenarformulario(){
	console.log("entra a rellenar formulario");
	var tokenUser = $("#token").val();

	github = new Github({
	  token: tokenUser,
	  auth: "oauth"
	});

	$("#repoform").html(repoHTML);
	$("#botonform").click(obtenerRepo);
};

function obtenerRepo(){
	var username = $("#user").val();
	var reponame = $("#repo").val();
	repo = github.getRepo(username, reponame);
	repo.show(function(err, repo) {
		if (err) {
			$("#inforepo").html("<p>Error code: " + err.error + "</p>");
		} else {
			var info = "<p>Info del repositorio:</p>" +
				   "<ul><li>Nombre: " + repo.full_name + "</li>" +
				   "<li>Descripcion: " + repo.description + "</li>" +
				   "<li>Creado: " + repo.created_at + "</li></ul>"
			$("#inforepo").html(info);
			$("#escritura").show();
			$("#botonwrite").click(escribirenrepo);
		}
	});
};


function escribirenrepo(){
	repo.write('master', $("#fich").val(), $("#conte").val(), 'Nuevo commit', function(err) {});
	$("#leer").show();
	$("#botonread").click(readrepo);
	$("#fich").val("");
	$("#conte").val("");
};

function readrepo(){
	console.log("voy a leer de = " + $("#repo1").val());
	repo.read('master', $("#repo1").val(), function(err, data) {
		$("#mostrarleer").html(data);
		$("#repo1").val("");
	});
}

jQuery(document).ready(function() {
	$("#escritura").hide();
	$("#leer").hide();
	$("#botontoken").click(rellenarformulario);	
});
