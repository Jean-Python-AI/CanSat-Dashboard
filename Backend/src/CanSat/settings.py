"""
PARAMÈTRES DJANGO - Configuration du projet
==========================================

Ce fichier configure Django pour votre projet CanSat.
Il définit la base de données, les applications installées, le sécurité, etc.

Ce n'est PAS un fichier à modifier souvent, sauf pour ajouter des apps
ou modifier des paramètres de sécurité.
"""

from pathlib import Path

# BASE_DIR = chemin absolu vers le dossier src/
# Path(__file__).resolve().parent.parent = src/CanSat/ → src/
BASE_DIR = Path(__file__).resolve().parent.parent


# ============================================================================
# SÉCURITÉ
# ============================================================================

# Clé secrète pour signer les sessions, tokens, etc.
# En production : mettre dans une variable d'environnement !
SECRET_KEY = "django-insecure-%)0b@9!na!w#mzb9mjpwrvs#i61ro9^t-#-65)4q+4cvkh!&z&"

# DEBUG = True montre les erreurs en détail (bien pour développement)
# DEBUG = False en production (pour sécuriser)
DEBUG = True

# Liste des domaines autorisés à accéder au serveur
# [] = seulement localhost
# ['*'] = tous les domaines (dangereux en production)
ALLOWED_HOSTS = ['*']


# ============================================================================
# APPLICATIONS INSTALLÉES
# ============================================================================

INSTALLED_APPS = [
    # Apps Django incluses :
    "django.contrib.admin",         # Interface d'admin
    "django.contrib.auth",          # Système d'authentification
    "django.contrib.contenttypes", # Gestion des types de contenu
    "django.contrib.sessions",     # Gestion des sessions
    "django.contrib.messages",     # Messages flash
    "django.contrib.staticfiles",  # Fichiers statiques (CSS, JS)
    
    # Apps tierces :
    "corsheaders",                 # Cross-Origin Resource Sharing (pour les APIs)
    
    # Votre app :
    "DATA_API"                     # L'app qu'on a créée
]

# ============================================================================
# MIDDLEWARE
# ============================================================================
# Le middleware = code qui s'exécute à chaque requête/réponse
# Comme un "filtre" ou "intercepteur"

MIDDLEWARE = [
    # CORS - DOIT ÊTRE EN PREMIER pour les requêtes cross-origin
    "corsheaders.middleware.CorsMiddleware",
    
    # Sécurité
    "django.middleware.security.SecurityMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    
    # Sessions et authentification
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    
    # Common (gestion des URLs, etc.)
    "django.middleware.common.CommonMiddleware",
    
    # CSRF - protection contre les attaques Cross-Site Request Forgery
    # (on la désactive avec @csrf_exempt dans les vues API)
    "django.middleware.csrf.CsrfViewMiddleware",
    
    # Messages
    "django.contrib.messages.middleware.MessageMiddleware",
]


# ============================================================================
# CORS (Cross-Origin Resource Sharing)
# ============================================================================
# Permet au CanSat (ou autre client) d'envoyer des requêtes depuis un autre domaine

# True = autorise toutes les origines (OK pour développement, NON pour production)
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# En production, remplacer par :
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:3000",
#     "http://votre-domaine.com",
# ]


# ============================================================================
# URLs
# ============================================================================

# ROOT_URLCONF = fichier principal des URLs (CanSat/urls.py)
ROOT_URLCONF = "CanSat.urls"


# ============================================================================
# TEMPLATES (HTML)
# ============================================================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # Dossiers où chercher les templates HTML
        "APP_DIRS": True,  # Chercher dans les dossiers templates des apps
        "OPTIONS": {
            "context_processors": [
                # Permet d'utiliser {{ request }} dans les templates
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                # Permet {{ user }} et {{ messages }} dans les templates
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# ============================================================================
# BASE DE DONNÉES
# ============================================================================

DATABASES = {
    "default": {
        # SQLite3 = fichier simple (db.sqlite3)
        # Pour production : "django.db.backends.postgresql" ou "mysql"
        "ENGINE": "django.db.backends.sqlite3",
        # Emplacement de la base : src/db.sqlite3
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# ============================================================================
# AUTHENTIFICATION
# ============================================================================

AUTH_PASSWORD_VALIDATORS = [
    # Empêche les mots de passe trop simples
    "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",  # Pas similaire au nom d'utilisateur
    "django.contrib.auth.password_validation.MinimumLengthValidator",             # Au moins 8 caractères
    "django.contrib.auth.password_validation.CommonPasswordValidator",           # Pas "password", "12345678", etc.
    "django.contrib.auth.password_validation.NumericPasswordValidator",         # Pas que des chiffres
]


# ============================================================================
# INTERNATIONALISATION
# ============================================================================

LANGUAGE_CODE = "en-us"   # Langue par défaut
TIME_ZONE = "UTC"         # Fuseau horaire
USE_I18N = True           # Activer la traduction
USE_TZ = True            # Utiliser les fuseaux horaires


# ============================================================================
# STATIC FILES (CSS, JS, Images)
# ============================================================================

STATIC_URL = "static/"  # URL pour accéder aux fichiers statiques


# ============================================================================
# CHAMPS AUTO
# ============================================================================

# Type de clé primaire auto-incrémentée pour les nouveaux modèles
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ============================================================================
# PARAMÈTRES COURAMMENT MODIFIÉS
# ============================================================================

# Pour ajouter une nouvelle app :
# 1. Créer l'app : python manage.py startapp nom_app
# 2. L'ajouter dans INSTALLED_APPS : "nom_app"

# Pour changer de base de données (ex: PostgreSQL) :
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql",
#         "NAME": "cansat_db",
#         "USER": "user",
#         "PASSWORD": "password",
#         "HOST": "localhost",
#         "PORT": "5432",
#     }
# }

# Pour configurer l'admin :
# 1. Créer superuser : python manage.py createsuperuser
# 2. Aller sur http://localhost:8000/admin/
