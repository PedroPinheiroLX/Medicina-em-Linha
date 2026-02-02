(function ($) {
  "use strict";
  // TOP Menu Sticky
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $("#sticky-header").removeClass("sticky");
      $('#back-top').fadeIn(500);
    } else {
      $("#sticky-header").addClass("sticky");
      $('#back-top').fadeIn(500);
    }
  });


  $(document).ready(function () {

    // review-active
    $('.testmonial_active').owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      autoplay: true,
      navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
      nav: true,
      dots: false,
      autoplayHoverPause: true,
      autoplaySpeed: 800,
      responsive: {
        0: {
          items: 1,
          dots: false,
          nav: false,
        },
        767: {
          items: 1,
          dots: false,
          nav: false,
        },
        992: {
          items: 1,
          nav: false
        },
        1200: {
          items: 1,
          nav: false
        },
        1500: {
          items: 1
        }
      }
    });


    // wow js
    // new WOW().init();

    // counter 
    /* $('.counter').counterUp({
      delay: 10,
      time: 10000
    });
    */


    // scrollIt for smoth scroll
    $.scrollIt({
      upKey: 38,             // key code to navigate to the next section
      downKey: 40,           // key code to navigate to the previous section
      easing: 'linear',      // the easing function for animation
      scrollTime: 600,       // how long (in ms) the animation takes
      activeClass: 'active', // class given to the active nav element
      onPageChange: null,    // function(pageIndex) that is called when page is changed
      topOffset: 0           // offste (in px) for fixed top navigation
    });

    // scrollup bottom to top
    /*
    $.scrollUp({
      scrollName: 'scrollUp', // Element ID
      topDistance: '4500', // Distance from top before showing element (px)
      topSpeed: 300, // Speed back to top (ms)
      animation: 'fade', // Fade, slide, none
      animationInSpeed: 200, // Animation in speed (ms)
      animationOutSpeed: 200, // Animation out speed (ms)
      scrollText: '<i class="fa fa-angle-double-up"></i>', // Text for element
      activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    });
    */


  });
})(jQuery);

(function () {
  var translations = window.melTranslations || {
    pt: {
      'notice.wait': 'Por favor, aguarde alguns segundos antes de enviar o formulário.',
      'notice.fail': 'O envio falhou. Tente novamente.',
      'notice.fail_generic': 'O envio falhou. Tente novamente.'
    },
    en: {
      'notice.wait': 'Please wait a few seconds before submitting the form.',
      'notice.fail': 'Submission failed. Please try again.',
      'notice.fail_generic': 'Submission failed. Please try again.'
    },
    es: {
      'notice.wait': 'Por favor, espere unos segundos antes de enviar el formulario.',
      'notice.fail': 'El envío falló. Inténtelo de nuevo.',
      'notice.fail_generic': 'El envío falló. Inténtelo de nuevo.'
    }
  };
  window.melTranslations = translations;

  function getLang() {
    var stored = localStorage.getItem('mel_lang') || 'pt';
    return ['pt', 'en', 'es'].indexOf(stored) >= 0 ? stored : 'pt';
  }

  function t(key) {
    var lang = getLang();
    return (translations[lang] && translations[lang][key]) || translations.pt[key] || '';
  }

  var form = document.getElementById('contactForm');
  if (!form) {
    return;
  }

  var notice = document.getElementById('form_notice');
  function setNotice(message) {
    if (!notice) {
      return;
    }
    notice.textContent = message || '';
    notice.classList.toggle('is-visible', Boolean(message));
  }

  var submitBtn = form.querySelector('button[type="submit"]');
  var startedAt = Date.now();
  if (submitBtn) {
    submitBtn.disabled = true;
    setTimeout(function () {
      submitBtn.disabled = false;
    }, 7000);
  }

  var requestDate = document.getElementById('request_date');
  function updateRequestDate() {
    if (!requestDate) {
      return;
    }
    requestDate.value = new Date().toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  updateRequestDate();

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var botcheck = form.querySelector('input[name="botcheck"]');
    if (botcheck && botcheck.checked) {
      return;
    }

    if (Date.now() - startedAt < 7000) {
      setNotice(t('notice.wait'));
      return;
    }

    setNotice('');
    updateRequestDate();

    var formData = new FormData(form);
    var redirectInput = form.querySelector('input[name="redirect"]');
    var redirectUrl = redirectInput ? redirectInput.value : 'emailReceivedTemplate.html';
    formData.delete('redirect');

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        window.location.href = redirectUrl;
        return;
      }
      response.json().then(function (data) {
        setNotice(data && data.message ? data.message : t('notice.fail'));
      }).catch(function () {
        setNotice(t('notice.fail_generic'));
      });
    }).catch(function () {
      setNotice(t('notice.fail_generic'));
    });
  });
})();

(function () {
  var translations = window.melTranslations || { pt: {}, en: {} };

  translations.pt = Object.assign({}, translations.pt, {
    'nav.home': 'Início',
    'nav.coverage': 'Áreas abrangidas',
    'nav.approach': 'Abordagem',
    'nav.about': 'Sobre Nós',
    'cta.book': 'Agendar Consulta',
    'hero.title': 'Cuidados de Saúde<br><span>à distância do seu contacto</span>',
    'hero.body': 'Na <u style="color: darkblue;">MEL</u> (Medicina em Linha), posicionamo-nos na vanguarda da<br> prestação de serviços médicos diferenciados, combinando o melhor<br> da telemedicina com a possibilidade de consultas médicas<br> presenciais ao domicílio, para oferecer uma experiência de saúde<br> abrangente e conveniente para todos os nossos utentes.',
    'services.tele.title': 'Teleconsultas',
    'services.tele.body': 'Consulte profissionais de saúde sem precisar de se deslocar.',
    'services.rx.title': 'Prescrições/Receitas',
    'services.rx.body': 'Para renovação de receituário crónico, prescrição de exames médicos e emissão de declarações.',
    'services.home.title': 'Consultas ao Domicílio',
    'services.home.body': 'Atendimentos médicos realizados na sua residência por um profissional de saúde.',
    'approach.title': 'Abordagem',
    'approach.body': 'Na MEL, acreditamos que a saúde deve ser acessível a todos, independentemente da localização ou circunstâncias individuais. Oferecemos uma ampla gama de serviços médicos, incluindo teleconsultas e aconselhamento médico, prescrição de receituário crónico e métodos complementares de diagnóstico à distância, para utentes dos 0 aos 100 anos.<br><br> Além disso, fornecemos serviços presenciais, incluindo consultas ao domicílio num raio de 100 km de distância de Lisboa, para atender às necessidades de saúde imediatas dos nossos pacientes.',
    'coverage.title': 'Áreas Abrangidas',
    'coverage.intro': 'Realizamos consultas presenciais ao domicílio em 4 Distritos e mais de 30 Concelhos:',
    'coverage.lisbon': '<u>Distrito de Lisboa</u>: Concelhos de Lisboa, Alenquer, Amadora, Arruda dos Vinhos, Azambuja, Cadaval, Cascais, Loures, Lourinhã, Mafra, Odivelas, Oeiras, Sintra, Sobral de Monte Agraço, Torres Vedras e Vila Franca de Xira.',
    'coverage.leiria': '<u>Distrito de Leiria</u>: Concelhos de Bombarral, Óbidos, Caldas da Rainha e Peniche.',
    'coverage.santarem': '<u>Distrito de Santarém</u>: Concelhos de Benavente, Cartaxo, Coruche, Rio Maior, Salvaterra de Magos e Santarém.',
    'coverage.setubal': '<u>Distrito de Setúbal</u>: Concelhos de Alcochete, Almada, Barreiro, Setúbal, Sesimbra, Seixal, Palmela, Moita e Montijo.',
    'coverage.remote': 'Realizamos atos médicos não presenciais em todo o restante território nacional e países da União Europeia.',
    'coverage.map.alt': 'Mapa das áreas abrangidas',
    'coverage.map.caption': 'Áreas Abrangidas pela MEL (imagem ilustrativa)',
    'logo.alt': 'Medicina em Linha',
    'hero.image.alt': 'Doutor Ricardo',
    'approach.image.alt': 'Consulta médica',
    'about.image.alt': 'Consulta médica',
    'about.title': 'Sobre Nós',
    'about.body': 'A nossa missão é estar em proximidade e à distância de um contacto do utente, proporcionando cuidados de saúde abrangentes que se adaptam às suas necessidades individuais. Com o lema "À Distância do Seu Contacto (At the distance of a phone call)", estamos comprometidos em ser facilmente acessíveis para os nossos pacientes, garantindo que recebam o cuidado médico de que necessitam, como, quando e onde precisarem.',
    'contact.title': 'Agende connosco, para podermos cuidar de si!',
    'contact.subject.home': 'Consulta ao Domicílio',
    'contact.subject.tele': 'Teleconsulta',
    'contact.subject.other': 'Outro',
    'contact.message.placeholder': 'Breve descrição do motivo da consulta e data pretendida',
    'contact.name.placeholder': 'Primeiro e último nome',
    'contact.email.placeholder': 'Email',
    'contact.submit': 'Enviar',
    'contact.image.alt': 'Profissional de saúde ao telefone',
    'testimonial.1': 'O Dr. Ricardo Pinheiro é um excelente profissional.<br>Muito atencioso e dedicado. Recomendo e caso necessário<br>voltarei, sem dúvida, a requisitar os seus serviços.',
    'testimonial.2': 'Quanto a mim e à minha familia, temos uma enorme gratidão ao Doutor<br>pela atenção e dedicação que nos foi prestada sempre que foi necessário.<br>Recomendo os seus serviços a todos os meus familiares e amigos.',
    'testimonial.3': 'Dr Ricardo is our family doctor and is always very professional.<br> Always with the best intentions and with fast response.<br> I feel safe and confident every time I contact MEL.<br> I highly recomend Dr Ricardo and his team.',
    'testimonial.4': 'Dr Ricardo and his colleagues help significantly and rapidly<br> with any medical questions or issues you have for the<br> whole family. Dr Ricardo is very skilled and thorough, he always<br> tries to find the cause of the problem and the best solution;<br> it feels very safe to have him at our disposal.',
    'testimonial.5': 'Passei para agradecer ao Dr. Ricardo por toda a disponibilidade<br> e amabilidade que tem para com os utentes.<br> Sempre super prestável, atencioso e profissional.<br> Recomendo, estou muito satisfeito e já é o meu médico<br> de família em qual confio para tudo 💪.',
    'testimonial.6': 'Excelente profissional, rápida resposta, muito disponível. Recomendo!',
    'testimonial.7': 'O doutor Ricardo Pinheiro é 5 estrelas, muito competente, prestável<br> e sempre pronto para atender às nossas necessidades.',
    'testimonial.8': 'O doutor Ricardo Pinheiro é um profissional de grande excelência,<br> com uma empatia sem igual, muito paciente e profissional;<br> Eu já não imagino a minha vida sem os cuidados dele,<br>obrigada, Doutor Ricardo Pinheiro.',
    'testimonial.9': 'Ricardo is a very professional doctor. One of the best attendance ever.<br> If you seek for help, he\'s the right one, quick response and very helpful.<br> He\'s been helping me during my preparation for pregnancy. Also recently<br> I had shingles, his diagnosis was fast and with his help and right medication<br> I got better in only few days. Totally recommend!',
    'footer.links.title': 'Links Úteis',
    'footer.links.about': 'Sobre Nós',
    'footer.links.contact': 'Contacte-nos',
    'footer.address.title': 'Morada',
    'footer.address.line1': 'Rua da Bombarda 66, 6º Esq. Lisboa, Portugal',
    'footer.address.line2': '+351 934 493 722',
    'footer.address.line3': 'medicinaemlinha@outlook.pt',
    'footer.copyright': 'Copyright',
    'footer.rights': 'Todos os direitos reservados',
    'footer.template': 'Este template foi feito por'
  });

  translations.en = Object.assign({}, translations.en, {
    'nav.home': 'Home',
    'nav.coverage': 'Coverage areas',
    'nav.approach': 'Approach',
    'nav.about': 'About Us',
    'cta.book': 'Book Appointment',
    'hero.title': 'Healthcare<br><span>at the distance of your contact</span>',
    'hero.body': 'At <u style="color: darkblue;">MEL</u> (Medicina em Linha), we are at the forefront of differentiated medical services, combining the best of telemedicine with in-home medical visits to offer a comprehensive and convenient healthcare experience for all our patients.',
    'services.tele.title': 'Telemedicine',
    'services.tele.body': 'Consult healthcare professionals without leaving your home.',
    'services.rx.title': 'Prescriptions',
    'services.rx.body': 'For renewal of chronic prescriptions, prescription of medical exams, and issuance of certificates.',
    'services.home.title': 'Home Visits',
    'services.home.body': 'Medical care provided in your residence by a healthcare professional.',
    'approach.title': 'Approach',
    'approach.body': 'At MEL, we believe healthcare should be accessible to everyone, regardless of location or individual circumstances. We offer a wide range of medical services, including teleconsultations and medical counseling, chronic prescription renewals and complementary remote diagnostic methods, for patients from 0 to 100 years old.<br><br> We also provide in-person services, including home visits within a 100 km radius of Lisbon, to meet our patients\' immediate healthcare needs.',
    'coverage.title': 'Coverage Areas',
    'coverage.intro': 'We provide in-home consultations in 4 districts and more than 30 municipalities:',
    'coverage.lisbon': '<u>Lisbon District</u>: Lisbon, Alenquer, Amadora, Arruda dos Vinhos, Azambuja, Cadaval, Cascais, Loures, Lourinhã, Mafra, Odivelas, Oeiras, Sintra, Sobral de Monte Agraço, Torres Vedras and Vila Franca de Xira.',
    'coverage.leiria': '<u>Leiria District</u>: Bombarral, Óbidos, Caldas da Rainha and Peniche.',
    'coverage.santarem': '<u>Santarém District</u>: Benavente, Cartaxo, Coruche, Rio Maior, Salvaterra de Magos and Santarém.',
    'coverage.setubal': '<u>Setúbal District</u>: Alcochete, Almada, Barreiro, Setúbal, Sesimbra, Seixal, Palmela, Moita and Montijo.',
    'coverage.remote': 'We provide non-in-person medical acts throughout the rest of the national territory and EU countries.',
    'coverage.map.alt': 'Map of coverage areas',
    'coverage.map.caption': 'MEL coverage areas (illustrative image)',
    'logo.alt': 'Medicina em Linha',
    'hero.image.alt': 'Doctor Ricardo',
    'approach.image.alt': 'Medical consultation',
    'about.image.alt': 'Medical consultation',
    'about.title': 'About Us',
    'about.body': 'Our mission is to be close and at the distance of a patient\'s contact, providing comprehensive healthcare that adapts to individual needs. With the motto “At the distance of a phone call”, we are committed to being easily accessible to our patients, ensuring they receive the care they need, when and where they need it.',
    'contact.title': 'Schedule with us, so we can take care of you!',
    'contact.subject.home': 'Home Visit',
    'contact.subject.tele': 'Teleconsultation',
    'contact.subject.other': 'Other',
    'contact.message.placeholder': 'Brief description of the reason for the consultation and desired date',
    'contact.name.placeholder': 'First and last name',
    'contact.email.placeholder': 'Email address',
    'contact.submit': 'Send',
    'contact.image.alt': 'Healthcare professional on the phone',
    'testimonial.1': 'Dr. Ricardo Pinheiro is an excellent professional.<br>Very attentive and dedicated. I recommend him and if needed<br>I will definitely request his services again.',
    'testimonial.2': 'My family and I are very grateful to the doctor<br>for the attention and dedication whenever it was necessary.<br>I recommend his services to all my family and friends.',
    'testimonial.3': 'Dr Ricardo is our family doctor and is always very professional.<br>Always with the best intentions and with fast response.<br>I feel safe and confident every time I contact MEL.<br>I highly recommend Dr Ricardo and his team.',
    'testimonial.4': 'Dr Ricardo and his colleagues help significantly and rapidly<br>with any medical questions or issues you have for the<br>whole family. Dr Ricardo is very skilled and thorough, he always<br>tries to find the cause of the problem and the best solution;<br>it feels very safe to have him at our disposal.',
    'testimonial.5': 'I just want to thank Dr. Ricardo for all his availability<br>and kindness towards patients.<br>Always very helpful, attentive and professional.<br> I recommend him, I am very satisfied and he is already<br> my family doctor whom I trust for everything 💪.',
    'testimonial.6': 'Excellent professional, quick response, very available. I recommend!',
    'testimonial.7': 'Dr. Ricardo Pinheiro is five-star, very competent, helpful<br>and always ready to meet our needs.',
    'testimonial.8': 'Dr. Ricardo Pinheiro is a professional of great excellence,<br>with unmatched empathy, very patient and professional;<br>I can no longer imagine my life without his care,<br>thank you, Dr. Ricardo Pinheiro.',
    'testimonial.9': 'Ricardo is a very professional doctor. One of the best attendance ever.<br> If you seek for help, he\'s the right one, quick response and very helpful.<br> He\'s been helping me during my preparation for pregnancy. Also recently I<br> had shingles, his diagnosis was fast and with his help and right medication<br> I got better in only few days. Totally recommend!',
    'footer.links.title': 'Useful Links',
    'footer.links.about': 'About Us',
    'footer.links.contact': 'Contact Us',
    'footer.address.title': 'Address',
    'footer.address.line1': 'Rua da Bombarda 66, 6º Esq. Lisbon, Portugal',
    'footer.address.line2': '+351 934 493 722',
    'footer.address.line3': 'medicinaemlinha@outlook.pt',
    'footer.copyright': 'Copyright',
    'footer.rights': 'All rights reserved',
    'footer.template': 'This template is made by'
  });

  translations.es = Object.assign({}, translations.es, {
    'nav.home': 'Inicio',
    'nav.coverage': 'Áreas de cobertura',
    'nav.approach': 'Enfoque',
    'nav.about': 'Sobre Nosotros',
    'cta.book': 'Reservar Consulta',
    'hero.title': 'Atención médica<br><span>a la distancia de su contacto</span>',
    'hero.body': 'En <u style="color: darkblue;">MEL</u> (Medicina en Línea), nos posicionamos a la vanguardia en la prestación de<br> servicios médicos diferenciados, combinando lo mejor<br> de la telemedicina con la posibilidad de consultas médicas<br> presenciales a domicilio, para ofrecer una experiencia de salud<br> integral y conveniente para todos nuestros usuarios.',
    'services.tele.title': 'Teleconsultas',
    'services.tele.body': 'Aceda a profesionales de la salud sin necesidad de desplazarse.',
    'services.rx.title': 'Prescripciones/Recetas',
    'services.rx.body': '“Para la renovación de recetas crónicas, la prescripción de exámenes médicos y la emisión de certificados.',
    'services.home.title': 'Consultas a Domicilio',
    'services.home.body': 'Atenciones médicas realizadas en su residencia por un profesional de la salud.',
    'approach.title': 'Enfoque',
    'approach.body': 'En MEL, creemos que la salud debe ser accesible para todos, independientemente de la ubicación o circunstancias individuales. Ofrecemos una amplia gama de servicios médicos, incluyendo teleconsultas y asesoramiento médico, renovación de recetas crónicas y métodos complementarios de diagnóstico a distancia, para pacientes de 0 a 100 años.<br><br> Además, proporcionamos servicios presenciales, incluyendo consultas a domicilio en un radio de 100 km de distancia de Lisboa, para atender las necesidades de salud inmediatas de nuestros pacientes.',
    'coverage.title': 'Áreas de Cobertura',
    'coverage.intro': 'Realizamos consultas presenciales a domicilio en 4 distritos y más de 30 municipios:',
    'coverage.lisbon': '<u>Distrito de Lisboa</u>: Municipios de Lisboa, Alenquer, Amadora, Arruda dos Vinhos, Azambuja, Cadaval, Cascais, Loures, Lourinhã, Mafra, Odivelas, Oeiras, Sintra, Sobral de Monte Agraço, Torres Vedras y Vila Franca de Xira.',
    'coverage.leiria': '<u>Distrito de Leiria</u>: Municipios de Bombarral, Óbidos, Caldas da Rainha y Peniche.',
    'coverage.santarem': '<u>Distrito de Santarém</u>: Municipios de Benavente, Cartaxo, Coruche, Rio Maior, Salvaterra de Magos y Santarém.',
    'coverage.setubal': '<u>Distrito de Setúbal</u>: Municipios de Alcochete, Almada, Barreiro, Setúbal, Sesimbra, Seixal, Palmela, Moita y Montijo.',
    'coverage.remote': 'Realizamos actos médicos no presenciales en todo el resto del territorio nacional y países de la Unión Europea.',
    'coverage.map.alt': 'Mapa de las áreas de cobertura',
    'coverage.map.caption': 'Áreas de cobertura de la MEL (imagen ilustrativa)',
    'logo.alt': 'Medicina en Línea',
    'hero.image.alt': 'Doctor Ricardo',
    'approach.image.alt': 'Consulta médica',
    'about.image.alt': 'Consulta médica',
    'about.title': 'Sobre Nosotros',
    'about.body': 'Nuestra misión es estar cerca y a la distancia de un contacto del paciente, proporcionando cuidados de salud integrales que se adaptan a sus necesidades individuales. Con el lema “A la distancia de su contacto (At the distance of a phone call)”, estamos comprometidos a ser fácilmente accesibles para nuestros pacientes, garantizando que reciban el cuidado médico que necesitan, como, cuando y donde lo necesiten.',
    'contact.title': 'Agende con nosotros, para poder cuidar de usted!',
    'contact.subject.home': 'Consulta a Domicilio',
    'contact.subject.tele': 'Teleconsulta',
    'contact.subject.other': 'Otro',
    'contact.message.placeholder': 'Breve descripción del motivo de la consulta y fecha deseada',
    'contact.name.placeholder': 'Nombre y apellido',
    'contact.email.placeholder': 'Correo electrónico',
    'contact.submit': 'Enviar',
    'contact.image.alt': 'Profesional de la salud al teléfono',
    'testimonial.1': 'El Dr. Ricardo Pinheiro es un excelente profesional.<br>Muy atento y dedicado. Lo recomiendo y, si es necesario,<br>volveré sin duda a solicitar sus servicios.',
    'testimonial.2': 'En lo personal y en mi familia, tenemos una enorme gratitud al doctor<br>por la atención y dedicación que nos brindó siempre que fue necesario.<br>Recomiendo sus servicios a todos mis familiares y amigos.',
    'testimonial.3': 'El Dr. Ricardo es nuestro médico de familia y siempre es muy profesional.<br>Siempre con las mejores intenciones y con respuesta rápida.<br>Me siento segura y confiada cada vez que contacto con MEL.<br>Recomiendo mucho al Dr. Ricardo y a su equipo.',
    'testimonial.4': 'El Dr. Ricardo y sus colegas ayudan de manera significativa y rápida<br>con cualquier cuestión médica que tengas para toda la familia.<br>El Dr. Ricardo es muy hábil y minucioso, siempre<br>intenta encontrar la causa del problema y la mejor solución;<br>se siente muy seguro tenerlo a nuestra disposición.',
    'testimonial.5': 'Pasé para agradecer al Dr. Ricardo por toda la disponibilidad<br>y amabilidad con los pacientes.<br>Siempre muy servicial, atento y profesional.<br>Lo recomiendo, estoy muy satisfecho y ya es mi médico<br>de familia en quien confío para todo 💪.',
    'testimonial.6': 'Excelente profesional, respuesta rápida, muy disponible. ¡Lo recomiendo!',
    'testimonial.7': 'El Dr. Ricardo Pinheiro es de cinco estrellas, muy competente, servicial<br>y siempre dispuesto a atender nuestras necesidades.',
    'testimonial.8': 'El Dr. Ricardo Pinheiro es un profesional de gran excelencia,<br>con una empatía inigualable, muy paciente y profesional;<br>ya no me imagino mi vida sin sus cuidados,<br>gracias, Dr. Ricardo Pinheiro.',
    'testimonial.9': 'Ricardo es un médico muy profesional. Una de las mejores atenciones que he recibido.<br>Si buscas ayuda, él es el indicado, respuesta rápida y muy útil.<br> Me ha estado ayudando durante mi preparación para el embarazo. También tuve<br> herpes zóster recientemente; su diagnóstico fue rápido y con su ayuda y la medicación<br> adecuada mejoré en pocos días. ¡Totalmente recomendable!',
    'footer.links.title': 'Enlaces Útiles',
    'footer.links.about': 'Sobre Nosotros',
    'footer.links.contact': 'Contáctenos',
    'footer.address.title': 'Dirección',
    'footer.address.line1': 'Rua da Bombarda 66, 6º Esq. Lisboa, Portugal',
    'footer.address.line2': '+351 934 493 722',
    'footer.address.line3': 'medicinaemlinha@outlook.pt',
    'footer.copyright': 'Copyright',
    'footer.rights': 'Todos los derechos reservados',
    'footer.template': 'Este template fue hecho por'
  });

  function applyTranslations(lang) {
    var dict = translations[lang] || translations.pt;
    document.documentElement.lang = lang === 'en' ? 'en' : (lang === 'es' ? 'es' : 'pt');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt');
      if (dict[key]) {
        el.setAttribute('alt', dict[key]);
      }
    });
    document.querySelectorAll('[data-i18n-value]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-value');
      if (dict[key]) {
        el.value = dict[key];
      }
    });
  }

  var stored = localStorage.getItem('mel_lang') || 'pt';
  if (['pt', 'en', 'es'].indexOf(stored) < 0) {
    stored = 'pt';
  }
  applyTranslations(stored);
  var selects = document.querySelectorAll('.lang-select');
  function syncSelects(lang) {
    selects.forEach(function (select) {
      select.value = lang;
    });
  }
  syncSelects(stored);
  selects.forEach(function (select) {
    select.addEventListener('change', function () {
      var next = select.value;
      if (['pt', 'en', 'es'].indexOf(next) < 0) {
        next = 'pt';
      }
      localStorage.setItem('mel_lang', next);
      applyTranslations(next);
      syncSelects(next);
    });
  });
})();
