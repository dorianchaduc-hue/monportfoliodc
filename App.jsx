import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Code, 
  Mail, 
  Github, 
  Linkedin, 
  ChevronRight, 
  Database, 
  Award,
  Layout,
  Lightbulb,
  Settings,
  FileText,
  CheckCircle,
  Search,
  ShieldCheck,
  Activity,
  Wrench,
  ChevronDown,
  ExternalLink,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';

// Composant réutilisable pour afficher une compétence sous forme de lien cliquable ou bouton
const ACSkill = ({ code, desc, color, onClick }) => {
  const colors = {
    indigo: {
      bg: 'bg-indigo-50', text: 'text-indigo-600', 
      hoverBg: 'group-hover:bg-indigo-600', hoverText: 'group-hover:text-white', 
      activeText: 'group-hover:text-indigo-700', icon: 'group-hover:text-indigo-600'
    },
    emerald: {
      bg: 'bg-emerald-50', text: 'text-emerald-600', 
      hoverBg: 'group-hover:bg-emerald-600', hoverText: 'group-hover:text-white', 
      activeText: 'group-hover:text-emerald-700', icon: 'group-hover:text-emerald-600'
    },
    orange: {
      bg: 'bg-orange-50', text: 'text-orange-600', 
      hoverBg: 'group-hover:bg-orange-600', hoverText: 'group-hover:text-white', 
      activeText: 'group-hover:text-orange-700', icon: 'group-hover:text-orange-600'
    }
  };
  const c = colors[color];
  const fileName = `Preuve_${code.replace('.', '_')}.pdf`;

  const content = (
    <>
      <span className={`shrink-0 mt-0.5 font-bold text-sm px-2.5 py-1.5 rounded transition-colors duration-300 ${c.bg} ${c.text} ${c.hoverBg} ${c.hoverText}`}>
        {code}
      </span>
      <span className={`leading-relaxed text-slate-700 text-base text-justify transition-colors duration-300 ${c.activeText}`}>
        {desc}
      </span>
      <ExternalLink className={`w-5 h-5 shrink-0 text-slate-300 transition-colors duration-300 mt-0.5 ${c.icon}`} />
    </>
  );

  if (onClick) {
    return (
      <li>
        <button 
          onClick={onClick}
          className="flex gap-4 items-start w-full text-left p-3.5 -mx-3.5 rounded-xl hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-slate-100 transition-all group cursor-pointer"
          title={`Voir la page dédiée pour ${code}`}
        >
          {content}
        </button>
      </li>
    );
  }

  return (
    <li>
      <a 
        href={fileName} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex gap-4 items-start p-3.5 -mx-3.5 rounded-xl hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-slate-100 transition-all group cursor-pointer"
        title={`Voir le justificatif pour ${code}`}
      >
        {content}
      </a>
    </li>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // États pour les Projets
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCustomDropdownOpen, setIsCustomDropdownOpen] = useState(false);
  
  // États pour les Compétences et Preuves
  const [selectedCompetence, setSelectedCompetence] = useState(null);
  const [selectedProof, setSelectedProof] = useState(null);
  const [activeProofTab, setActiveProofTab] = useState('tdb');

  // États pour le menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const [isMobileCompetencesOpen, setIsMobileCompetencesOpen] = useState(false);

  // --- DONNÉES ---
  const projectsData = {
    s1: {
      id: 's1',
      title: 'SAE Le thermomètre de bain S1',
      category: 'ÉLECTRONIQUE & CONCEPTION',
      desc: "Conception et réalisation d'un thermomètre de bain pour bébé (Baby Corporation). Ce projet de premier semestre a permis de mettre en pratique l'analyse fonctionnelle et le prototypage pour respecter un cahier des charges strict (détection < 36°C et > 39°C, autonomie > 24h, coût < 20€). Au sein d'une équipe de 4, je me suis spécifiquement chargé du développement des blocs 'Action' et 'Traitement' (utilisation d'amplificateurs opérationnels en comparateur, dimensionnement de composants).",
      tags: ["Capteurs", "Prototypage", "Amplificateurs", "Composants"],
      image: "image_tdb.jpg",
      rapport: "SAE_thermometre_de_bain_pour_bebe.pdf",
      dossierConception: "Dossier_Conception_S1.pdf",
      dossierFabrication: "Dossier_Fabrication_S1.pdf",
      dossierVerification: "Dossier_Verification_S1.pdf"
    },
    s2: {
      id: 's2',
      title: 'SAE Le kart à hélice S2',
      category: 'SYSTÈMES EMBARQUÉS & ÉLECTRONIQUE',
      desc: "Conception en équipe d'un kart propulsé par hélice. J'ai spécifiquement travaillé sur la conception de la carte électronique réceptrice : réception et analyse du signal infrarouge envoyé par le pilote, puis contrôle de la puissance du moteur, de la direction et du klaxon. Un projet m'ayant permis d'appréhender la conception de bout en bout d'un produit.",
      tags: ["Cartes Électroniques", "Infrarouge", "Travail en équipe", "Validation des essais"],
      image: "image_kart.jpg",
      rapport: "SAE_Le_kart_a_helice_KAH.pdf",
      dossierConception: "KAH_DDC_EQ33.docx",
      dossierFabrication: "Dossier_Fabrication_S2.pdf",
      dossierVerification: "Dossier_Verification_S2.pdf"
    },
    s3: {
      id: 's3',
      title: 'SAE Le Mini robot sumo S3',
      category: 'ROBOTIQUE & AUTOMATISME',
      desc: "Création d'un mini robot sumo autonome pour le semestre 3 (S3). Intégration de capteurs, programmation de la logique de combat et optimisation de la motorisation pour respecter un cahier des charges strict.",
      tags: ["Robotique", "Programmation", "Intégration système"],
      image: "image_sumo.jpg",
      rapport: "Rapport_Mini_Robot_Sumo_S3.pdf",
      dossierConception: "B3_DDC_EQ34_V4.pdf",
      dossierFabrication: "Dossier_Fabrication_S3.pdf",
      dossierVerification: "Dossier_Verification_S3.pdf"
    }
  };

  const competencesData = {
    concevoir: {
      id: 'concevoir',
      title: 'Concevoir',
      icon: Award,
      colorTheme: 'indigo',
      badgeClass: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
      borderClass: 'border-slate-200 hover:border-indigo-400',
      desc: "Concevoir la partie physique ou logicielle d'un système embarqué ou d'une installation industrielle."
    },
    verifier: {
      id: 'verifier',
      title: 'Vérifier',
      icon: CheckCircle,
      colorTheme: 'emerald',
      badgeClass: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
      borderClass: 'border-slate-200 hover:border-emerald-400',
      desc: "Vérifier et valider un système embarqué ou une installation industrielle."
    },
    maintenir: {
      id: 'maintenir',
      title: 'Maintenir',
      icon: Wrench,
      colorTheme: 'orange',
      badgeClass: 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
      borderClass: 'border-slate-200 hover:border-orange-400',
      desc: "Assurer le maintien en condition opérationnelle d'un système embarqué ou d'une installation industrielle."
    }
  };

  // --- LOGIQUE ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeSection = (id) => {
    setActiveSection(id);
    if (id === 'projets') {
      setSelectedProject(null);
      setIsCustomDropdownOpen(false);
    }
    if (id === 'competences') {
      setSelectedCompetence(null);
      setSelectedProof(null);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProjectDetails = (projectId) => {
    setSelectedProject(projectId);
    setActiveSection('projets');
    setIsMobileMenuOpen(false);
    setIsCustomDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCompetenceDetails = (compId) => {
    setSelectedCompetence(compId);
    setSelectedProof(null);
    setActiveSection('competences');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProof = (proofId) => {
    setSelectedProof(proofId);
    setActiveSection('preuve');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentProject = selectedProject ? projectsData[selectedProject] : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* --- NAVIGATION FIXE --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative">
          
          <div className="font-bold text-xl tracking-tight text-indigo-600">DORIAN CHADUC.</div>
          
          {/* MENU DESKTOP */}
          <div className="hidden md:flex space-x-8 items-center">
            
            <button onClick={() => changeSection('accueil')} className={`text-sm font-medium transition-colors py-2 ${activeSection === 'accueil' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-slate-600 hover:text-indigo-600'}`}>Accueil</button>
            <button onClick={() => changeSection('apropos')} className={`text-sm font-medium transition-colors py-2 ${activeSection === 'apropos' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-slate-600 hover:text-indigo-600'}`}>À Propos</button>
            <button onClick={() => changeSection('experiences')} className={`text-sm font-medium transition-colors py-2 ${activeSection === 'experiences' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-slate-600 hover:text-indigo-600'}`}>Parcours</button>

            {/* Menu Déroulant PROJETS */}
            <div className="relative group">
              <button 
                onClick={() => changeSection('projets')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${activeSection === 'projets' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                Projets <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-1.5 z-50 overflow-hidden">
                {Object.values(projectsData).map(p => (
                  <button
                    key={p.id}
                    onClick={() => openProjectDetails(p.id)}
                    className={`px-4 py-2.5 text-left transition-colors hover:bg-indigo-50 border-l-2 ${selectedProject === p.id && activeSection === 'projets' ? 'border-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-700'}`}
                  >
                    <div className={`text-[10px] font-bold mb-0.5 uppercase tracking-wider ${selectedProject === p.id && activeSection === 'projets' ? 'text-indigo-600' : 'text-slate-400'}`}>{p.id}</div>
                    <div className={`text-xs font-semibold leading-tight ${selectedProject === p.id && activeSection === 'projets' ? 'text-indigo-700' : 'text-slate-700'}`}>{p.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Déroulant COMPÉTENCES */}
            <div className="relative group">
              <button 
                onClick={() => changeSection('competences')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${activeSection === 'competences' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                Compétences <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-1.5 z-50 overflow-hidden">
                {Object.values(competencesData).map(c => {
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.id}
                      onClick={() => openCompetenceDetails(c.id)}
                      className={`px-4 py-3 text-left transition-colors hover:bg-slate-50 border-l-2 flex items-center gap-3 ${selectedCompetence === c.id && activeSection === 'competences' ? 'border-indigo-600 bg-slate-50/50 text-indigo-700' : 'border-transparent text-slate-700'}`}
                    >
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-semibold">{c.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Bouton Menu Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MENU MOBILE DÉROULANT */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg flex flex-col py-4 px-6 space-y-4 z-40">
            
            <button onClick={() => changeSection('accueil')} className={`text-left text-base font-medium py-2 ${activeSection === 'accueil' ? 'text-indigo-600' : 'text-slate-700'}`}>Accueil</button>
            <button onClick={() => changeSection('apropos')} className={`text-left text-base font-medium py-2 ${activeSection === 'apropos' ? 'text-indigo-600' : 'text-slate-700'}`}>À Propos</button>
            <button onClick={() => changeSection('experiences')} className={`text-left text-base font-medium py-2 ${activeSection === 'experiences' ? 'text-indigo-600' : 'text-slate-700'}`}>Parcours</button>

            {/* Accordéon Projets Mobile */}
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => setIsMobileProjectsOpen(!isMobileProjectsOpen)}
                className={`flex items-center justify-between text-base font-medium py-2 ${activeSection === 'projets' ? 'text-indigo-600' : 'text-slate-700'}`}
              >
                <span onClick={(e) => { e.stopPropagation(); changeSection('projets'); }}>Projets</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isMobileProjectsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileProjectsOpen && (
                <div className="flex flex-col pl-4 space-y-3 border-l-2 border-slate-100">
                  {Object.values(projectsData).map(p => (
                    <button key={p.id} onClick={() => openProjectDetails(p.id)} className={`text-left text-sm font-medium ${selectedProject === p.id && activeSection === 'projets' ? 'text-indigo-600' : 'text-slate-500'}`}>
                      {p.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accordéon Compétences Mobile */}
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => setIsMobileCompetencesOpen(!isMobileCompetencesOpen)}
                className={`flex items-center justify-between text-base font-medium py-2 ${activeSection === 'competences' ? 'text-indigo-600' : 'text-slate-700'}`}
              >
                <span onClick={(e) => { e.stopPropagation(); changeSection('competences'); }}>Compétences</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isMobileCompetencesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileCompetencesOpen && (
                <div className="flex flex-col pl-4 space-y-3 border-l-2 border-slate-100">
                  {Object.values(competencesData).map(c => (
                    <button key={c.id} onClick={() => openCompetenceDetails(c.id)} className={`text-left text-sm font-medium ${selectedCompetence === c.id && activeSection === 'competences' ? 'text-indigo-600' : 'text-slate-500'}`}>
                      {c.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </nav>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="flex-grow pt-20">

        {/* --- SECTION ACCUEIL --- */}
        {activeSection === 'accueil' && (
          <section id="accueil" className="min-h-[calc(100vh-80px)] flex items-center px-6 relative overflow-hidden">
            <div className="absolute top-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>

            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10 py-12">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-700 text-sm font-semibold">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                  Recherche de stage : 8 à 12 sem. (Dès le 7 avril)
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Bonjour, je suis <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Dorian Chaduc.</span>
                  </h1>
                  <h2 className="text-lg md:text-xl font-semibold text-slate-700">
                    Futur Technicien Supérieur en <span className="text-indigo-600">GEII</span>
                  </h2>
                  <p className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed text-justify">
                    Étudiant en 2ème année à l'IUT de Bordeaux (Parcours Électricité et Maîtrise de l'Énergie). Passionné par la conception électronique, l'automatisation et les systèmes embarqués.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500"/> Électronique
                  </span>
                  <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-500"/> Énergie
                  </span>
                  <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Settings className="w-4 h-4 text-indigo-500"/> Systèmes Embarqués
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button 
                    onClick={() => changeSection('apropos')}
                    className="px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-200 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                  >
                    Découvrir mon profil <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3">
                    <a href="mailto:dorianchaduc@gmail.com" className="p-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300 shadow-sm">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative hidden md:block">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-4 bg-gradient-to-tr from-indigo-100 to-violet-50 rounded-full border border-indigo-50 shadow-inner"></div>
                  <div className="absolute inset-8 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 bg-white">
                    <img 
                      src="image_accueil.jpg" 
                      alt="Électronique Concept" 
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800";
                      }}
                    />
                  </div>
                  <div className="absolute top-12 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
                    <Award className="w-8 h-8 text-amber-500" />
                  </div>
                  <div className="absolute bottom-16 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
                    <Database className="w-8 h-8 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- SECTION A PROPOS --- */}
        {activeSection === 'apropos' && (
          <section id="apropos" className="py-12 md:py-24 bg-white px-6 min-h-[calc(100vh-80px)]">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                <User className="text-indigo-600" /> À Propos de moi
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
                <div className="md:col-span-2 space-y-6">
                  <p className="text-lg text-slate-600 leading-relaxed text-justify">
                    Actuellement en deuxième année de <strong>BUT Génie Électrique et Informatique Industrielle (GEII)</strong> à l'Université de Bordeaux, je suis le parcours Électricité et Maîtrise de l'Énergie (EME). Au cours de ma formation, j'ai développé de solides compétences en analyse des besoins, sélection de composants et conception de circuits électroniques.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed text-justify">
                    Je suis activement à la recherche d'un <strong>stage de 8 à 12 semaines à partir du 7 avril</strong>. Mon objectif est d'intégrer une équipe pour travailler sur l'étude, la production ou la maintenance des systèmes de conversion de l'énergie électrique.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed text-justify">
                    En parallèle de mes études, je pratique l'<strong>athlétisme à un niveau national</strong> depuis 11 ans. J'ai notamment participé aux championnats de France (en salle et en extérieur) et je m'investis en tant que juge bénévole lors des compétitions. Ce sport m'a appris la rigueur, la détermination et le dépassement de soi, des qualités que j'avance au quotidien dans mes projets techniques.
                  </p>
                  
                  <div className="flex gap-8 py-4 border-y border-slate-100">
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">11 ans</div>
                      <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Athlétisme</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">Permis B</div>
                      <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Véhiculé</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">7 Avril</div>
                      <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Disponibilité</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-2xl space-y-4 h-fit">
                  <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2">Mes Centres d'intérêts</h3>
                  <ul className="space-y-2 text-sm text-slate-600 text-justify">
                    <li><strong className="text-indigo-600">Sport :</strong> Athlétisme (compétitions nationales).</li>
                    <li><strong className="text-indigo-600">Voyages :</strong> Découverte du Canada, Espagne, Norvège, États-Unis.</li>
                    <li><strong className="text-indigo-600">Culture :</strong> Cinéma, films et séries.</li>
                    <li><strong className="text-indigo-600">Personnel :</strong> Passer du temps en famille.</li>
                  </ul>
                  
                  <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
                    <div className="text-sm">
                      <span className="block text-slate-400 font-semibold mb-1">Localisation</span> 
                      <span className="font-medium text-slate-800">Saint Aubin de Médoc, FR</span>
                    </div>
                    <div className="text-sm">
                      <span className="block text-slate-400 font-semibold mb-1">Téléphone</span> 
                      <span className="font-medium text-slate-800">+33 6 14 69 16 55</span>
                    </div>
                    <div className="text-sm">
                      <span className="block text-slate-400 font-semibold mb-1">Email</span> 
                      <span className="font-medium text-indigo-600 break-words">dorianchaduc@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- SECTION EXPERIENCES --- */}
        {activeSection === 'experiences' && (
          <section id="experiences" className="py-12 md:py-24 px-6 bg-slate-50 min-h-[calc(100vh-80px)]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <Briefcase className="text-indigo-600" /> Parcours & Formation
              </h2>
              <div className="space-y-12 relative before:absolute before:left-0 md:before:left-1/2 before:w-px before:h-full before:bg-slate-200">
                {[
                  {
                    date: "Aujourd'hui",
                    role: "Étudiant 2ème année BUT GEII",
                    company: "Université de Bordeaux - IUT (Gradignan)",
                    desc: "Spécialisation dans le parcours EME (Électricité et Maîtrise de l'Énergie). Apprentissage approfondi en électronique, systèmes embarqués et automatismes à travers de nombreux projets concrets.",
                    tags: ["Électronique", "Énergie", "Systèmes Embarqués"]
                  },
                  {
                    date: "Stage (2 mois) - BUT2",
                    role: "Stagiaire Maintenance",
                    company: "Engie Solutions",
                    desc: "Maintenance d'un data center au cours de la deuxième année de BUT GEII.",
                    tags: ["Maintenance", "Data Center", "Engie Solutions"]
                  },
                  {
                    date: "Depuis 11 ans",
                    role: "Athlète de Niveau National",
                    company: "Fédération Française d'Athlétisme",
                    desc: "Pratique intensive de l'athlétisme avec participation aux championnats de France en salle et en extérieur. Juge bénévole lors des compétitions. Développement d'une grande rigueur et d'un fort esprit d'équipe.",
                    tags: ["Compétition", "Rigueur", "Esprit d'équipe", "Bénévolat"]
                  },
                  {
                    date: "Obtenu",
                    role: "Baccalauréat Général",
                    company: "Lycée",
                    desc: "Obtention du baccalauréat avec spécialités scientifiques : Mathématiques, Physique-Chimie, et NSI (Numérique et Sciences Informatiques).",
                    tags: ["Mathématiques", "Physique", "NSI"]
                  }
                ].map((exp, idx) => (
                  <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white"></div>
                    <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <span className="text-indigo-600 font-bold text-sm">{exp.date}</span>
                      <h3 className="text-xl font-bold mt-1">{exp.role}</h3>
                      <div className="text-slate-500 font-medium mb-4">{exp.company}</div>
                      <p className="text-slate-600 mb-6 text-justify">{exp.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- SECTION PROJETS --- */}
        {activeSection === 'projets' && (
          <section id="projets" className="py-12 md:py-24 px-6 bg-slate-50 min-h-[calc(100vh-80px)]">
            <div className="max-w-5xl mx-auto">
              
              {!currentProject ? (
                // VUE 1 : LA SÉLECTION DU PROJET
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100 max-w-3xl mx-auto mt-10 animate-in fade-in zoom-in duration-500 relative z-10">
                  <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-0 transition-transform">
                    <Code className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">Mes Projets GEII</h2>
                  <p className="text-lg text-slate-600 mb-10 leading-relaxed text-center">
                    Sélectionnez un projet ci-dessous pour explorer mon travail, de l'analyse fonctionnelle jusqu'au rapport final.
                  </p>

                  <div className="relative text-left max-w-xl mx-auto">
                    <button
                      onClick={() => setIsCustomDropdownOpen(!isCustomDropdownOpen)}
                      className="w-full bg-white border-2 border-slate-200 text-slate-800 py-5 px-6 rounded-2xl font-bold text-lg focus:outline-none focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-600 shadow-sm hover:border-indigo-400 transition-all flex justify-between items-center group"
                    >
                      <span className="flex items-center gap-3">
                        <Search className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                        Rechercher une réalisation...
                      </span>
                      <div className={`p-2 rounded-xl transition-colors ${isCustomDropdownOpen ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
                        <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isCustomDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    <div className={`absolute top-full left-0 w-full mt-4 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 transform origin-top ${isCustomDropdownOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-95 opacity-0 invisible'} z-50`}>
                      {Object.values(projectsData).map((p, index) => (
                        <button
                          key={p.id}
                          onClick={() => openProjectDetails(p.id)}
                          className={`w-full text-left px-6 py-5 hover:bg-indigo-50/50 transition-all flex items-center justify-between group ${index !== Object.values(projectsData).length - 1 ? 'border-b border-slate-100' : ''}`}
                        >
                          <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 bg-slate-200">
                              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800"; }}
                              />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wider">{p.category}</div>
                              <div className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{p.title}</div>
                            </div>
                          </div>
                          <div className="w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white text-slate-400 transition-all shadow-sm transform group-hover:translate-x-1">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // VUE 2 : LE DÉTAIL D'UN PROJET SÉLECTIONNÉ
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <button 
                    onClick={() => {
                      setSelectedProject(null);
                      setIsCustomDropdownOpen(true);
                    }}
                    className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors px-4 py-2 rounded-xl hover:bg-white border border-transparent hover:border-indigo-100 shadow-sm"
                  >
                    <ArrowLeft className="w-5 h-5" /> Retour à la sélection des projets
                  </button>

                  <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="w-full h-64 md:h-[450px] relative bg-slate-200">
                      <img 
                        src={currentProject.image} 
                        className="w-full h-full object-cover" 
                        alt={currentProject.title}
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800";
                        }}
                      />
                      <div className="absolute top-6 left-6 md:top-8 md:left-8">
                        <span className="px-4 py-2 bg-indigo-600/90 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-lg tracking-wider">
                          {currentProject.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 md:p-12">
                      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        {currentProject.title}
                      </h2>
                      <p className="text-lg text-slate-600 leading-relaxed text-justify mb-8">
                        {currentProject.desc}
                      </p>
                      
                      <div className="mb-12">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Compétences mobilisées</h4>
                        <div className="flex flex-wrap gap-3">
                          {currentProject.tags.map(tag => (
                            <div key={tag} className="flex items-center text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-lg shadow-sm">
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-10 border-t border-slate-100">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Livrables et Documents du projet</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {currentProject.dossierConception && (
                            <a href={currentProject.dossierConception} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group bg-white shadow-sm hover:shadow-md">
                              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Lightbulb className="w-6 h-6" /></div>
                              <div className="flex flex-col"><span className="font-bold text-slate-800 group-hover:text-indigo-700 text-lg">Dossier de Conception</span><span className="text-sm text-slate-500">Ouvrir le PDF</span></div>
                            </a>
                          )}
                          {currentProject.dossierFabrication && (
                            <a href={currentProject.dossierFabrication} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group bg-white shadow-sm hover:shadow-md">
                              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Wrench className="w-6 h-6" /></div>
                              <div className="flex flex-col"><span className="font-bold text-slate-800 group-hover:text-indigo-700 text-lg">Dossier de Fabrication</span><span className="text-sm text-slate-500">Ouvrir le PDF</span></div>
                            </a>
                          )}
                          {currentProject.dossierVerification && (
                            <a href={currentProject.dossierVerification} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group bg-white shadow-sm hover:shadow-md">
                              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors"><ShieldCheck className="w-6 h-6" /></div>
                              <div className="flex flex-col"><span className="font-bold text-slate-800 group-hover:text-indigo-700 text-lg">Dossier de Vérification</span><span className="text-sm text-slate-500">Ouvrir le PDF</span></div>
                            </a>
                          )}
                          {currentProject.rapport && (
                            <a href={currentProject.rapport} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group bg-white shadow-sm hover:shadow-md">
                              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors"><FileText className="w-6 h-6" /></div>
                              <div className="flex flex-col"><span className="font-bold text-slate-800 group-hover:text-indigo-700 text-lg">Rapport Final</span><span className="text-sm text-slate-500">Ouvrir le PDF</span></div>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* --- SECTION COMPÉTENCES --- */}
        {activeSection === 'competences' && (
          <section id="competences" className="py-12 md:py-24 px-6 bg-slate-50 min-h-[calc(100vh-80px)]">
            <div className="max-w-6xl mx-auto">
              
              {!selectedCompetence ? (
                // VUE 1 : LA SÉLECTION DE LA COMPÉTENCE (Grandes Cartes)
                <div className="animate-in fade-in zoom-in duration-500">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold flex items-center justify-center gap-4 mb-6 text-slate-900">
                      <Database className="text-indigo-600 w-10 h-10" /> Mes Compétences GEII
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                      Sélectionnez un domaine de compétence ci-dessous pour découvrir le détail des apprentissages et accéder à mes justificatifs PDF.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {Object.values(competencesData).map((comp) => {
                      const Icon = comp.icon;
                      return (
                        <div 
                          key={comp.id}
                          onClick={() => openCompetenceDetails(comp.id)}
                          className={`bg-white rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl border transition-all duration-300 cursor-pointer group flex flex-col items-center text-center ${comp.borderClass}`}
                        >
                          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-3 ${comp.badgeClass}`}>
                            <Icon className="w-10 h-10" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-4">{comp.title}</h3>
                          <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                            {comp.desc}
                          </p>
                          <div className={`inline-flex items-center gap-2 font-bold text-sm tracking-wide uppercase transition-colors text-${comp.colorTheme}-600 group-hover:text-${comp.colorTheme}-700`}>
                            Voir les détails <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // VUE 2 : LE DÉTAIL D'UNE COMPÉTENCE SÉLECTIONNÉE
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
                  
                  <button 
                    onClick={() => setSelectedCompetence(null)}
                    className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors px-4 py-2 rounded-xl hover:bg-white border border-transparent hover:border-indigo-100 shadow-sm"
                  >
                    <ArrowLeft className="w-5 h-5" /> Retour aux domaines de compétences
                  </button>

                  <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100">
                    
                    {/* Bloc Spécifique "Concevoir" */}
                    {selectedCompetence === 'concevoir' && (
                      <div>
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                          <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl"><Award className="w-8 h-8" /></div>
                          <div>
                            <h2 className="text-3xl font-extrabold text-slate-900">Concevoir</h2>
                            <p className="text-slate-500 font-medium">Concevoir la partie physique ou logicielle d'un système embarqué ou d'une installation industrielle.</p>
                          </div>
                        </div>
                        
                        <div className="space-y-12">
                          <div>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Lightbulb className="w-6 h-6 text-indigo-400"/> Compétences - Concevoir</h3>
                            <ul className="space-y-2">
                              <ACSkill code="C.1" desc="J'identifie les fonctions demandées à la lecture du cahier des charges" color="indigo" onClick={() => openProof('C.1')} />
                              <ACSkill code="C.2" desc="Je propose une solution technique pour répondre à une fonction" color="indigo" onClick={() => openProof('C.2')} />
                              <ACSkill code="C.3" desc="J'affine une solution technique en m'appuyant sur un maquettage numérique et/ou matériel" color="indigo" onClick={() => openProof('C.3')} />
                              <ACSkill code="C.4" desc="Je rédige un dossier de conception et de fabrication" color="indigo" onClick={() => openProof('C.4')} />
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bloc Spécifique "Vérifier" */}
                    {selectedCompetence === 'verifier' && (
                      <div>
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                          <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl"><CheckCircle className="w-8 h-8" /></div>
                          <div>
                            <h2 className="text-3xl font-extrabold text-slate-900">Vérifier</h2>
                            <p className="text-slate-500 font-medium">Vérifier et valider un système embarqué ou une installation industrielle.</p>
                          </div>
                        </div>
                        
                        <div className="space-y-12">
                          <div>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Search className="w-6 h-6 text-emerald-400"/> Compétences - Vérifier</h3>
                            <ul className="space-y-2">
                              <ACSkill code="V.1" desc="J'applique, j'élabore, je rédige une procédure d'essais" color="emerald" onClick={() => openProof('V.1')} />
                              <ACSkill code="V.2" desc="J'identifie, je corrige les non-conformités d'un prototype" color="emerald" onClick={() => openProof('V.2')} />
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bloc Spécifique "Maintenir" */}
                    {selectedCompetence === 'maintenir' && (
                      <div>
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                          <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl"><Wrench className="w-8 h-8" /></div>
                          <div>
                            <h2 className="text-3xl font-extrabold text-slate-900">Maintien en condition opérationnelle</h2>
                            <p className="text-slate-500 font-medium">Assurer le maintien en condition opérationnelle d'un système embarqué ou d'une installation industrielle.</p>
                          </div>
                        </div>
                        
                        <div className="space-y-12">
                          <div>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Wrench className="w-6 h-6 text-orange-400"/> Compétences - Maintenir</h3>
                            <ul className="space-y-2">
                              <ACSkill code="M.1" desc="J'applique une opération de maintenance (préventive, corrective, améliorative) à un système" color="orange" onClick={() => openProof('M.1')} />
                              <ACSkill code="M.2" desc="Je rédige la procédure de maintenance (préventive, corrective, améliorative) d'un système" color="orange" onClick={() => openProof('M.2')} />
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* --- SECTION PREUVE DÉDIÉE (C.1) - PRÉSENTATION GÉNÉRALE ET UNIFIÉE --- */}
        {activeSection === 'preuve' && selectedProof === 'C.1' && (
          <section id="preuve-c1" className="py-12 md:py-24 px-6 bg-slate-50 min-h-[calc(100vh-80px)]">
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <button 
                onClick={() => {
                  setActiveSection('competences');
                  setSelectedProof(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors px-4 py-2 rounded-xl hover:bg-white border border-transparent hover:border-indigo-100 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" /> Retour à la compétence "Concevoir"
              </button>

              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12 space-y-12">
                
                {/* En-tête de la Preuve */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl"><Lightbulb className="w-8 h-8" /></div>
                    <div>
                      <div className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-1">Preuve d'acquisition : C.1</div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">J'identifie les fonctions demandées à la lecture du cahier des charges</h2>
                    </div>
                  </div>
                </div>

                {/* Justification de l'acquisition (Section Générale) */}
                <div className="bg-indigo-50/50 border-l-4 border-indigo-600 p-6 rounded-r-2xl space-y-3">
                  <h3 className="font-extrabold text-indigo-900 text-base tracking-wide uppercase">Justification de l'acquisition</h3>
                  <p className="text-slate-700 font-medium text-lg leading-relaxed text-justify">
                    J'ai validé cette compétence transversale car j'ai systématiquement défini l'architecture fonctionnelle de chaque système physique étudié avant d'effectuer tout choix de composants ou d'écriture logicielle.
                  </p>
                </div>

                {/* Coeur de la compétence : Méthodologie d'Analyse */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
                  
                  {/* Colonne 1 & 2 : Démarche Générale */}
                  <div className="lg:col-span-2 space-y-6 text-slate-600 text-justify leading-relaxed">
                    <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-3">Démarche d'analyse descendante</h3>
                    
                    <p>
                      Pour répondre avec rigueur à tout cahier des charges technique, je structure le système cible en blocs élémentaires via un schéma fonctionnel (méthode SADT / blocs fonctionnels). Cette approche me permet de dissocier les fonctions clés : **Alimenter, Acquérir, Traiter, Communiquer et Agir**.
                    </p>
                    
                    <p>
                      Cette modélisation préalable permet d'identifier avec précision :
                    </p>
                    <ul className="list-disc pl-6 space-y-2 marker:text-indigo-500">
                      <li>Les <strong>flux d'informations entrants</strong> (grandeurs physiques, signaux de capteurs analogiques, trames infrarouges de télécommande).</li>
                      <li>La <strong>chaîne de traitement intermédiaire</strong> (amplificateurs, comparateurs analogiques, logique séquentielle ou microcontrôleurs programmés).</li>
                      <li>Les <strong>flux d'action sortants</strong> (commandes de moteurs modulées en PWM, affichages LED, signaux acoustiques de klaxon).</li>
                    </ul>
                    
                    <p className="pt-4 border-t border-slate-100">
                      Une fois cette cartographie fonctionnelle dessinée, elle sert de base stable et partagée pour répartir de façon modulaire les tâches techniques et le dérisquage au sein d'une équipe projet.
                    </p>
                  </div>

                  {/* Colonne 3 : Schéma Générique de l'analyse */}
                  <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-3">Modélisation standard</h3>
                    <div className="rounded-xl overflow-hidden shadow-md bg-white border border-slate-100 p-4 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-slate-50 text-indigo-500 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                        <Settings className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
                      </div>
                      <div className="text-sm font-bold text-slate-800 uppercase mb-2">Structure Universelle</div>
                      <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg font-mono">
                        Acquérir ➔ Traiter ➔ Agir
                      </div>
                    </div>
                  </div>

                </div>

                {/* Synthèse des Applications Concrètes */}
                <div className="pt-10 border-t border-slate-100 space-y-6">
                  <h3 className="text-xl font-bold text-slate-800">Applications concrètes à travers mon parcours</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Projet S1 */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">S1 : Thermomètre de bain</div>
                        <h4 className="font-bold text-slate-800 text-lg mb-3">Identification des seuils thermiques</h4>
                        <p className="text-sm text-slate-600 text-justify mb-4">
                          Extraction des exigences thermiques (&lt; 36°C et &gt; 39°C) et modélisation du bloc "Acquisition" à base de capteur analogique LM35 et "Traitement" via comparateurs LM339.
                        </p>
                      </div>
                      <div className="text-xs font-semibold text-slate-400 font-mono">LM35 / Comparateurs / LED</div>
                    </div>

                    {/* Projet S2 */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">S2 : Kart à Hélice</div>
                        <h4 className="font-bold text-slate-800 text-lg mb-3">Liaison de pilotage Émetteur/Récepteur</h4>
                        <p className="text-sm text-slate-600 text-justify mb-4">
                          Définition de l'interface fonctionnelle infrarouge (TSOP/Oscillateur) pour assurer la transmission fiable des consignes de propulsion mécanique et de klaxon d'IHM.
                        </p>
                      </div>
                      <div className="text-xs font-semibold text-slate-400 font-mono">Infrarouge / Puissance / Servomoteur</div>
                    </div>

                    {/* Projet S3 */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">S3 : Robot Sumo</div>
                        <h4 className="font-bold text-slate-800 text-lg mb-3">Logique décisionnelle autonome</h4>
                        <p className="text-sm text-slate-600 text-justify mb-4">
                          Structure logique intégrant les contraintes de démarrage (temporisation réglementaire de 5s), d'actionneurs de puissance (Pont en H, PWM) et de capteurs de distance.
                        </p>
                      </div>
                      <div className="text-xs font-semibold text-slate-400 font-mono">Télémètres / Pont en H / PWM</div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* --- SECTION PREUVE DÉDIÉE (C.2) - VERSION SIMPLIFIÉE --- */}
        {activeSection === 'preuve' && selectedProof === 'C.2' && (
          <section id="preuve-c2" className="py-12 md:py-24 px-6 bg-slate-50 min-h-[calc(100vh-80px)]">
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <button 
                onClick={() => {
                  setActiveSection('competences');
                  setSelectedProof(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors px-4 py-2 rounded-xl hover:bg-white border border-transparent hover:border-indigo-100 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" /> Retour à la compétence "Concevoir"
              </button>

              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12 space-y-8">
                
                {/* En-tête de la Preuve */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl"><Settings className="w-8 h-8" /></div>
                    <div>
                      <div className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-1">Preuve d'acquisition : C.2</div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Je propose une solution technique pour répondre à une fonction</h2>
                    </div>
                  </div>
                </div>

                {/* Justification de l'acquisition */}
                <div className="bg-indigo-50/50 border-l-4 border-indigo-600 p-6 rounded-r-2xl space-y-2">
                  <h3 className="font-extrabold text-indigo-900 text-sm tracking-wide uppercase">Justification de l'acquisition</h3>
                  <p className="text-slate-700 font-semibold text-base leading-relaxed text-justify">
                    J'ai validé cette compétence en réalisant une FAD (Fiche d'Analyse de Décision) pour sélectionner de façon rationnelle et scientifique les composants critiques de mes projets.
                  </p>
                </div>

                {/* Démarche comparative FAD */}
                <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
                  <p>
                    Pour répondre efficacement à une fonction technique demandée par le cahier des charges (par exemple : <em>"Acquérir la position de l'adversaire"</em> sur le robot Sumo), j'utilise une FAD pour comparer objectivement les solutions technologiques disponibles. 
                  </p>
                  <p>
                    Cela me permet d'écarter les solutions inadaptées et de retenir le composant optimal selon des critères précis de fiabilité, de coût et d'encombrement.
                  </p>
                </div>

                {/* Tableau FAD ultra-simplifié */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="font-bold text-slate-800 text-base">Exemple d'arbitrage : Détection d'adversaire (Robot Sumo)</h4>
                    <p className="text-xs text-slate-400">Comparatif de deux technologies d'acquisition</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="p-4 bg-white rounded-xl border border-slate-200/60 shadow-sm">
                      <div className="inline-flex px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs uppercase mb-3">Solution Retenue</div>
                      <h5 className="font-bold text-slate-800 text-base mb-1">Capteur Infrarouge (Sharp GP2Y0A21)</h5>
                      <p className="text-sm text-slate-500">
                        Choisi pour son faisceau optique très étroit et sa grande directivité. Il évite ainsi de capter de faux obstacles situés en dehors de l'arène de combat.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-slate-200/60 shadow-sm opacity-75">
                      <div className="inline-flex px-2.5 py-1 rounded-full bg-red-50 text-red-500 font-bold text-xs uppercase mb-3">Solution Écartée</div>
                      <h5 className="font-bold text-slate-800 text-base mb-1">Télémètre Ultrasons (HC-SR04)</h5>
                      <p className="text-sm text-slate-500">
                        Écarté car son cône d'écho est trop large (30°), ce qui provoque des rebonds parasites sur la bordure de l'arène et des fausses détections de l'adversaire.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fiches de synthèse des 3 SAE */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800">Décisions clés sur mes projets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-indigo-600 uppercase block mb-1">S1 : Thermomètre</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">LM35 vs CTN</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Le capteur LM35 a été retenu pour sa sortie en tension directement linéaire (10mV/°C), évitant d'intégrer un calcul de linéarisation logiciel lourd.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-indigo-600 uppercase block mb-1">S2 : Kart à Hélice</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Récepteur TSOP vs Photodiode</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Le récepteur TSOP a été choisi pour sa démodulation intégrée à 36kHz, rendant l'acquisition des commandes insensible à la lumière ambiante.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-indigo-600 uppercase block mb-1">S3 : Robot Sumo</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Infrarouge vs Ultrasons</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        La solution infrarouge de Sharp a été privilégiée pour garantir un faisceau directif étroit, indispensable à la précision lors du combat rapproché.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* --- SECTION PREUVE DÉDIÉE (C.3) - PLAN DE MAQUETTAGE --- */}
        {activeSection === 'preuve' && selectedProof === 'C.3' && (
          <section id="preuve-c3" className="py-12 md:py-24 px-6 bg-slate-50 min-h-[calc(100vh-80px)]">
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <button 
                onClick={() => {
                  setActiveSection('competences');
                  setSelectedProof(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors px-4 py-2 rounded-xl hover:bg-white border border-transparent hover:border-indigo-100 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" /> Retour à la compétence "Concevoir"
              </button>

              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12 space-y-8">
                
                {/* En-tête de la Preuve */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl"><Lightbulb className="w-8 h-8" /></div>
                    <div>
                      <div className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-1">Preuve d'acquisition : C.3</div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">J'affine une solution technique en m'appuyant sur un maquettage numérique et/ou matériel</h2>
                    </div>
                  </div>
                </div>

                {/* Justification de l'acquisition */}
                <div className="bg-indigo-50/50 border-l-4 border-indigo-600 p-6 rounded-r-2xl space-y-2">
                  <h3 className="font-extrabold text-indigo-900 text-sm tracking-wide uppercase">Justification de l'acquisition</h3>
                  <p className="text-slate-700 font-semibold text-base leading-relaxed text-justify">
                    J'ai validé cette compétence en réalisant systématiquement des phases de maquettage mixte : des simulations logicielles (Proteus, ISIS) et des maquettes physiques (breadboard) pour valider et ajuster mes circuits avant toute fabrication finale de PCB.
                  </p>
                </div>

                {/* Approche complémentaire numérique/matériel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="inline-flex px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs uppercase">Maquettage Numérique (Simulation)</div>
                    <p className="text-sm text-slate-600 text-justify">
                      Utilisé pour valider le comportement théorique des signaux. Par exemple, la simulation sur Proteus a permis de calculer et observer la courbe de charge de la constante de temps du circuit de Reset de mon microcontrôleur pour vérifier son bon déclenchement.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="inline-flex px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold text-xs uppercase">Maquettage Matériel (Plaque d'essais)</div>
                    <p className="text-sm text-slate-600 text-justify">
                      Utilisé pour valider le comportement réel en confrontant la théorie aux imperfections physiques. Par exemple, le test sur plaque d'essais (breadboard) de l'interface de puissance moteurs pour vérifier l'absence de parasites électriques de commutation.
                    </p>
                  </div>
                </div>

                {/* Synthèse des applications sur mes 3 projets */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800">Dérisquage et maquettage sur mes projets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-indigo-600 uppercase block mb-1">S1 : Thermomètre</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Simulation des comparateurs</h4>
                      <p className="text-xs text-slate-500 leading-relaxed text-justify">
                        Maquettage numérique sur Proteus pour ajuster le réseau de résistances de référence et s'assurer du basculement franc des LED froides, tièdes et chaudes selon les seuils théoriques de tension (360mV et 390mV).
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-indigo-600 uppercase block mb-1">S2 : Kart à Hélice</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Prototypage carte émettrice</h4>
                      <p className="text-xs text-slate-500 leading-relaxed text-justify">
                        Assemblage et câblage sur plaque d'essais de la télécommande afin de vérifier la bonne oscillation du quartz à 16MHz et valider la structure de reset matériel (τ &gt; 2.5 µs) de notre ATMEGA328P.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-indigo-600 uppercase block mb-1">S3 : Robot Sumo</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Dérisquage puissance</h4>
                      <p className="text-xs text-slate-500 leading-relaxed text-justify">
                        Maquettage matériel de l'interface pont en H DRV8835 avec les moteurs de traction pour mesurer les pics de courant réels de démarrage et valider le besoin d'un condensateur de découplage de 1000 µF.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* --- SECTION PREUVE DÉDIÉE (C.4) - RÉDACTION DOSSIERS --- */}
        {activeSection === 'preuve' && selectedProof === 'C.4' && (
          <section id="preuve-c4" className="py-12 md:py-24 px-6 bg-slate-50 min-h-[calc(100vh-80px)]">
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <button 
                onClick={() => {
                  setActiveSection('competences');
                  setSelectedProof(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors px-4 py-2 rounded-xl hover:bg-white border border-transparent hover:border-indigo-100 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" /> Retour à la compétence "Concevoir"
              </button>

              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12 space-y-8">
                
                {/* En-tête de la Preuve */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl"><FileText className="w-8 h-8" /></div>
                    <div>
                      <div className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-1">Preuve d'acquisition : C.4</div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Je rédige un dossier de conception et de fabrication</h2>
                    </div>
                  </div>
                </div>

                {/* Justification de l'acquisition */}
                <div className="bg-indigo-50/50 border-l-4 border-indigo-600 p-6 rounded-r-2xl space-y-2">
                  <h3 className="font-extrabold text-indigo-900 text-sm tracking-wide uppercase">Justification de l'acquisition</h3>
                  <p className="text-slate-700 font-semibold text-base leading-relaxed text-justify">
                    J'ai validé cette compétence en rédigeant pour chaque projet de SAE un Dossier de Conception (DDC) et un Dossier de Fabrication (DDF) complets, comprenant des nomenclatures matérielles (BOM) rigoureusement chiffrées et des plans d'implantation topologiques.
                  </p>
                </div>

                {/* Structure des dossiers de projet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="inline-flex px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs uppercase">Dossier de Conception (DDC)</div>
                    <p className="text-sm text-slate-600 text-justify">
                      Sert à formaliser et justifier scientifiquement les choix d'architecture. Il intègre l'analyse fonctionnelle descendante, les équations physiques et mathématiques de dimensionnement (constantes de temps, pont diviseur) et les résultats théoriques validés en simulation logicielle (Proteus/Ares).
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="inline-flex px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold text-xs uppercase">Dossier de Fabrication (DDF)</div>
                    <p className="text-sm text-slate-600 text-justify">
                      Sert de guide d'assemblage et d'approvisionnement pour la production physique. Il contient la nomenclature détaillée chiffrée (BOM) avec tolérances et boîtiers (série E12/E24, packages THD), les typons de routage de la carte électronique et les consignes de sécurité pour le brasage.
                    </p>
                  </div>
                </div>

                {/* Synthèse des applications sur mes 3 projets */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800">Livrables et livraisons documentaires sur mes SAE</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-indigo-600 uppercase block mb-1">S1 : Thermomètre</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Calculs de seuils & BOM</h4>
                      <p className="text-xs text-slate-500 leading-relaxed text-justify">
                        Rédaction du dossier de conception intégrant les équations de seuils de tension (360mV et 390mV) pour le LM339, et la nomenclature des LED d'IHM à faible prix.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-indigo-600 uppercase block mb-1">S2 : Kart à Hélice</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Plan d'implantation 100x75mm</h4>
                      <p className="text-xs text-slate-500 leading-relaxed text-justify">
                        Rédaction du DDF intégrant les cotations et le plan de carte électronique réceptrice (100x75mm) avec des trous de fixation de 3mm idéalement positionnés à 6mm des bords.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-indigo-600 uppercase block mb-1">S3 : Robot Sumo</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Nomenclature à 117,51 € HT</h4>
                      <p className="text-xs text-slate-500 leading-relaxed text-justify">
                        Budgétisation initiale et finale de la nomenclature complète du prototype (117,51 € HT / 141,01 € TTC), validant ainsi l'exigence budgétaire contractuelle de moins de 120 € HT.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* --- SECTION PREUVE DÉDIÉE (V.1) - PLANS D'ESSAIS --- */}
        {activeSection === 'preuve' && selectedProof === 'V.1' && (
          <section id="preuve-v1" className="py-12 md:py-24 px-6 bg-slate-50 min-h-[calc(100vh-80px)]">
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <button 
                onClick={() => {
                  setActiveSection('competences');
                  setSelectedProof(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors px-4 py-2 rounded-xl hover:bg-white border border-transparent hover:border-indigo-100 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" /> Retour à la compétence "Vérifier"
              </button>

              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12 space-y-8">
                
                {/* En-tête de la Preuve */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl"><Search className="w-8 h-8" /></div>
                    <div>
                      <div className="text-sm font-bold text-emerald-600 tracking-widest uppercase mb-1">Preuve d'acquisition : V.1</div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">J'applique, j'élabore, je rédige une procédure d'essais</h2>
                    </div>
                  </div>
                </div>

                {/* Justification de l'acquisition */}
                <div className="bg-emerald-50/50 border-l-4 border-emerald-600 p-6 rounded-r-2xl space-y-2">
                  <h3 className="font-extrabold text-emerald-900 text-sm tracking-wide uppercase">Justification de l'acquisition</h3>
                  <p className="text-slate-700 font-semibold text-base leading-relaxed text-justify">
                    J'ai validé cette compétence en concevant et en déroulant des protocoles d'essais précis (mesures d'oscilloscopes, relevés de tensions, vérification de signaux PWM) pour valider le bon fonctionnement de mes prototypes par rapport aux exigences du cahier des charges.
                  </p>
                </div>

                {/* Approche complémentaire méthodologique */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs uppercase">Élaboration de la procédure</div>
                    <p className="text-sm text-slate-600 text-justify">
                      Consiste à définir un protocole strict de test pour isoler une fonction (par exemple : alimenter l'Arduino en mesurant une tension stabilisée à 5 V en sortie de régulateur) et définir la tolérance admissible (+/- 5% soit entre 4,75V et 5,25V).
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="inline-flex px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs uppercase">Mesures instrumentales</div>
                    <p className="text-sm text-slate-600 text-justify">
                      Mise en œuvre d'appareils de laboratoire réels (oscilloscope, multimètre de table, alimentation stabilisée) pour capturer les grandeurs dynamiques et statiques des circuits de commande et de puissance.
                    </p>
                  </div>
                </div>

                {/* Synthèse des applications sur mes 3 projets */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800">Protocoles de validation d'essais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-emerald-600 uppercase block mb-1">S1 : Thermomètre</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Vérification des seuils</h4>
                      <p className="text-xs text-slate-500 leading-relaxed text-justify">
                        Mesure au multimètre des seuils de tension de basculement des comparateurs (360mV et 390mV) pour s'assurer que les LED s'allument à la bonne température simulée par un générateur.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-emerald-600 uppercase block mb-1">S2 : Kart à Hélice</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Signaux PWM & Klaxon</h4>
                      <p className="text-xs text-slate-500 leading-relaxed text-justify">
                        Mesure de la fréquence du signal carré de klaxon à l'oscilloscope pour valider la conformité à 4 kHz +/- 100Hz, et validation de l'état haut de la trame NEC (1ms à 2ms) pour la direction.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-emerald-600 uppercase block mb-1">S3 : Robot Sumo</span>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm">Essais de déplacement</h4>
                      <p className="text-xs text-slate-500 leading-relaxed text-justify">
                        Validation des fonctions logiques de traction (avancer, reculer, pivoter) et relevé de la courbe de tension batterie au multimètre pour valider le seuil de sécurité à 6.7V.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* --- SECTION PREUVE DÉDIÉE (V.2) - NON-CONFORMITÉS --- */}
        {activeSection === 'preuve' && selectedProof === 'V.2' && (
          <section id="preuve-v2" className="py-12 md:py-24 px-6 bg-slate-50 min-h-[calc(100vh-80px)]">
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <button 
                onClick={() => {
                  setActiveSection('competences');
                  setSelectedProof(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors px-4 py-2 rounded-xl hover:bg-white border border-transparent hover:border-indigo-100 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" /> Retour à la compétence "Vérifier"
              </button>

              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12 space-y-8">
                
                {/* En-tête de la Preuve */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl"><ShieldCheck className="w-8 h-8" /></div>
                    <div>
                      <div className="text-sm font-bold text-emerald-600 tracking-widest uppercase mb-1">Preuve d'acquisition : V.2</div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">J'identifie, je corrige les non-conformités d'un prototype</h2>
                    </div>
                  </div>
                </div>

                {/* Justification de l'acquisition */}
                <div className="bg-emerald-50/50 border-l-4 border-emerald-600 p-6 rounded-r-2xl space-y-2">
                  <h3 className="font-extrabold text-emerald-900 text-sm tracking-wide uppercase">Justification de l'acquisition</h3>
                  <p className="text-slate-700 font-semibold text-base leading-relaxed text-justify">
                    J'ai validé cette compétence en diagnostiquant des pannes réelles (erreurs de câblage, inversions de polarité, dysfonctionnements logiciels ou matériels défectueux) sur mes prototypes lors des phases de mise au point et en y apportant des solutions correctives adaptées.
                  </p>
                </div>

                {/* Diagnostic & Correction */}
                <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
                  <p>
                    Lors de la mise au point de circuits imprimés ou de programmes embarqués, l'identification d'une non-conformité nécessite une démarche structurée : analyse des symptômes, tests de continuité électriques au multimètre, relecture du code informatique et isolation des sous-systèmes fautifs.
                  </p>
                </div>

                {/* Cas concrets de correction de pannes réelles */}
                <div className="pt-6 border-t border-slate-100 space-y-6">
                  <h3 className="text-lg font-bold text-slate-800">Dépannages et correctifs appliqués en SAE</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-600 uppercase block mb-1">S1 : Thermomètre</span>
                        <h4 className="font-bold text-slate-800 mb-2 text-sm text-justify">Inversion des comparateurs</h4>
                        <p className="text-xs text-slate-500 leading-relaxed text-justify">
                          <strong>Non-conformité :</strong> Une inversion des entrées des AOP et des seuils chaud/froid empêchait l'allumage de la LED verte de confort via la porte logique NOR. <br />
                          <strong>Correction :</strong> Repérage de l'inversion par test de tension et modification physique du câblage pour rétablir la bonne logique matérielle.
                        </p>
                      </div>
                      <div className="text-[11px] font-semibold text-red-600 pt-3">Bug matériel corrigé 🛠️</div>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-600 uppercase block mb-1">S2 : Kart à Hélice</span>
                        <h4 className="font-bold text-slate-800 mb-2 text-sm text-justify">Alimentation Brushless</h4>
                        <p className="text-xs text-slate-500 leading-relaxed text-justify">
                          <strong>Non-conformité :</strong> Le moteur brushless de propulsion ne pouvait tourner avec une alimentation continue simple issue du régulateur.<br />
                          <strong>Correction :</strong> Intégration d'un contrôleur brushless ESC (XREG10) géré par signal PWM issu de l'ATMEGA328P pour découper le courant triphasé.
                        </p>
                      </div>
                      <div className="text-[11px] font-semibold text-red-600 pt-3">Incompatibilité moteur résolue ⚡</div>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-600 uppercase block mb-1">S3 : Robot Sumo</span>
                        <h4 className="font-bold text-slate-800 mb-2 text-sm text-justify">Panne d'entrée MCU</h4>
                        <p className="text-xs text-slate-500 leading-relaxed text-justify">
                          <strong>Non-conformité :</strong> Lors des premiers essais, l'entrée analogique A0 de la carte Arduino Uno ne renvoyait aucun signal de mesure.<br />
                          <strong>Correction :</strong> Redirection de l'acquisition de la tension batterie vers la broche analogique saine A1 et modification de la broche dans le code C.
                        </p>
                      </div>
                      <div className="text-[11px] font-semibold text-red-600 pt-3">Routage alternatif validé 💻</div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-slate-900 text-slate-400 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white font-bold text-xl">DORIAN CHADUC.</div>
          <div className="text-sm">© 2026 Tous droits réservés. Créé avec passion.</div>
          <div className="flex gap-6">
            <a href="mailto:dorianchaduc@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;