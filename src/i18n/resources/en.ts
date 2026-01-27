const en = {
  translation: {
    annulla: "Cancel",
    dettagli: "Details",
    precedente: "Prev",
    salva: "Save",
    submit: "Submit",
    successivo: "Next",
    info_short: "Info",
    info_long: "Informations",
    messaggio: "Message",
    modifica: "Edit",
    elimina: "Delete",
    ricercaPlaceholder: "Search...",
    selezionaUtente: "Utente",
    seiSicuro: "Are you sure?",
    nonCorrisponde: "Doesn't match",
    caricamento: { titolo: "Loading...", descrizione: "Please wait" },
    login: {
      welcomeToTrackIt: "Welcome to TrackIT. Sign in",
      username: "Username",
      password: "Password",
      login: "Login",
      errore: {
        titolo: "Error during login",
        descrizione: "Authentication failed. Check your credentials",
      },
    },
    main_menu: {
      titolo: "Main Menu",
      home: "Home Page",
      utenti: "Users",
      about: "About",
      effettuaIlLogin: "Click here to login",
      progetti: "Projects",
    },
    utenti: {
      cambioPassword: {
        caption: "Reset password",
        successo: "User password has been changed🔐",
        errore: "Error during the password changing",
      },
      cognome: "Last name",
      cognomePlaceholder: "Doe",
      nome: "First name",
      nomePlaceholder: "John",
      nuovo: "Add New User",
      username: "Username",
      usernameHelper: "It will be used by the user to login",
      usernameNecessario: "Username is required",
      usernamePlaceholder: "john.doe",
      email: "Email",
      emailNonValida: "Email must be a valid format",
      emailPlaceholder: "john.doe@trackit.it",
      infoUtenteStep: "User info",
      modificaInfoUtente: "Edit user @{{nominativo}} info",
      password: "Password",
      passwordDiverse: "The password are not equal",
      passwordNonValida: "Password must be at least {{min}} characters",
      passwordRipeti: "Repeat password",
      passwordStep: "Set user password",
      confermaCreazione: "Do you confirm to add new user?",
      eliminaUtenteMessaggio:
        "This action cannot be undone. This will permanently delete the <bold>{{nominativo}}</bold> account and remove data from the systems. Type <badge>trackit/@{{username}}</badge> to confirm del deletion.",
      salvataggioCompletato: {
        titolo: "Upload completed!🥳",
        descrizione: "User has been saved successfully",
      },
      erroreSalvataggio: {
        titolo: "Error during uploading🥲",
        descrizione:
          "An error occured during the upload of user information {{errore}}",
      },
    },
    progetti: {
      listaProgetti: "Projects list",
      nuovoProgetto: "New Project",
    },
    not_found: {
      pageNotFound: "Page Not Found",
      message:
        "Sorry, the page you’re looking for doesn’t exist or may have been moved. Please check the URL or return to the homepage.",
      ritornaAllaHome: "Go Back Home",
    },
    forbidden: {
      accessoNegato: "Access Denied",
      message: "You do not have the permission to access this resource.",
      ritornaAllaHome: "Go Back Home",
      tornaIndietro: "Bo Back",
    },
  },
};

export default en;
