var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
const cors = require('cors');

const UsuarioEmail = require('../models/usuarioEmail');
app.use( cors() );
/*
	Aquí estamos configurando los detalles de su servidor SMTP. STMP es un servidor de correo que se encarga de enviar y recibir correo electrónico.
*/


var smtpTransport = nodemailer.createTransport({
  //  service: "Gmail",
  //  auth: {
    //    user: "capital032786@gmail.com",
	//    pass: "onzstnwuluvkbqow"
		//pass de gmail= onzstnwuluvkbqow
	host: "mail.jobandcare.com",
	port: 587,
	secure: false,
	requireTLS: true,
	auth: {
		user: 'admin@jobandcare.com',
		pass: 'C@po032786'
	},
	tls: {
		rejectUnauthorized: false  
	}
    
});
var rand,mailOptions,host,link,maillist;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/


app.post('/send',function(req,res){
		   
	const { email } = req.body;

        rand=Math.floor((Math.random() * 1000) + 5000);
        app.get('/codigo',function(req,res){
            res.json({
                ok: true,
                msg: rand
            });
        });
     
		console.log(rand);
	host=req.get('host');
	link="http://"+req.get('host')+"/verify?id="+rand;
	

	const mail = req.body.email;
    maillist = [req.body.email];
  //<a href="+link+">Haga clic aquí para verificar</a>  esta line es por si quiere verificar  
	mailOptions={
		
		from: '"JOB & CARE" <admin@jobandcare.com>',
		to : maillist,
		cc: 'info@jobandcare.com',
		subject : "Confirme su cuenta de correo electrónico",
		html : `
		<table border="0" cellpadding="0" cellspacing="0" width="100px" background-color="#56c2c6" bgcolor="#56c2c6">
		<tr height="100px">  
			<td bgcolor="" width="600px">
			<img src="http://144.91.108.162:4500/uploads/logoazul.jpg" width="280"  height="300">
			<br>

				<h1 style="color: #fff; text-align:center">Bienvenido Job & Care </h1>
				<h3 style="color: #fff; text-align:center">Su codigo de verificación es: ${rand} </h3>
			
			</td>
		</tr>
		<tr bgcolor="#fff">
			<td style="text-align:center">
				<p style="color: #000">¡Un mundo de servicios a su disposición!</p>
			</td>
		</tr>
		</table> `
	}

	console.log(mailOptions);

	smtpTransport.sendMail( mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
		res.end("error");
	 }else{
            console.log("Message sent: " + rand);
           
           // res.end('sent')
		  // res.json('sent');
		  const email = new UsuarioEmail( req.body );
		  email.save();
		  res.json({
			ok: true,
			data: 'sent'
		});
          
      
            
    	 }
});


});



app.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
	console.log("El dominio coincide. La información proviene de un correo electrónico auténtico");
	if(req.query.id==rand)
	{
        console.log("El correo electrónico está verificado");
      
        res.end("<h1>Email "+mailOptions.to+" Se ha verificado correctamente y su codigo es "+rand+"");
      
   
	}
	else
	{
		console.log("correo no identificado");
		res.end("<h1>Solicitud incorrecta</h1>");
	}
}
else
{
	res.end("<h1>La solicitud es de una fuente desconocida</h1>");
}
});

/*--------------------Routing Over----------------------------*/

module.exports = app;

