"""
MODELES - Définition de la base de données
==========================================

Un "model" en Django = une table dans la base de données.
Chaque classe = une table, chaque attribut = une colonne.

 Django ORM (Object-Relational Mapping) :
 - Pas besoin d'écrire de SQL
 - On manipule des objets Python, Django traduit en SQL
 - Ex: Launch.objects.all() = SELECT * FROM launch

 Principes clés :
 - models.Model = classe de base pour tous les modèles
 - Chaque champ (CharField, FloatField, etc.) = colonne SQL
 - related_name = nom pour accéder aux objets liés depuis l'autre modèle
 - on_delete = qué faire si l'objet lié est supprimé (CASCADE = tout supprimer)
"""

from django.db import models


class Launch(models.Model):
    """
    Modèle représentant une session de lancer/vol de CanSat.
    
    En base de données : table "DATA_API_launch"
    
    Champs :
    - name : nom du lancer (texte, max 100 caractères)
    - created_at : date de création (自动 ajouté par auto_now_add=True)
    - is_recording : True si le CanSat envoie des données en ce moment
    """
    
    # CharField = texte court (comme VARCHAR en SQL)
    # max_length=100 = maximum 100 caractères
    name = models.CharField(max_length=100)
    
    # DateTimeField = date et heure
    # auto_now_add=True = automatiquement défini à la création, ne change jamais
    created_at = models.DateTimeField(auto_now_add=True)
    
    # BooleanField = True/False
    # default=True = valeur par défaut si non spécifié
    is_recording = models.BooleanField(default=True)

    def __str__(self):
        """
        Définit comment l'objet s'affiche dans l'admin Django et le debug.
        C'est comme la méthode __repr__ ou __str__ en Python standard.
        """
        return self.name


class Data(models.Model):
    """
    Modèle représentant une donnée de télémesure (une ligne de données).
    
    En base de données : table "DATA_API_data"
    
    Chaque instance = une mesure à un instant t (altitude, température, etc.)
    
    Relation : chaque Data appartient à un Launch (ForeignKey)
    Via related_name="telemetries", on peut faire:
        launch.telemetries.all() → toutes les données de ce lancer
    """
    
    # ForeignKey = clé étrangère (relation 1-à-plusieurs)
    # Launch = référence au modèle Launch
    # on_delete=models.CASCADE = si on supprime le Launch, on supprime aussi les Data
    # related_name="telemetries" = nom pour accéder aux données depuis un Launch
    launch = models.ForeignKey(Launch, on_delete=models.CASCADE, related_name="telemetries")
    
    # FloatField = nombre décimal (comme REAL en SQL)
    time = models.FloatField()           # Temps écoulé depuis le début (secondes)
    altitude = models.FloatField()        # Altitude (mètres)
    temperature = models.FloatField()    # Température (degrés Celsius)
    pressure = models.FloatField()       # Pression (hPa)
    
    latitude = models.FloatField()        # Latitude GPS
    longitude = models.FloatField()       # Longitude GPS
    
    # auto_now_add=True = automatiquement défini à la création
    created_at = models.DateTimeField(auto_now_add=True)


# ============================================================================
# GUIDE POUR AJOUTER UN NOUVEAU CHAMP
# ============================================================================
#
# Exemple : ajouter un champ "vitesse" (vitesse du vent) au modèle Data
#
# 1. Ajouter le champ dans la classe :
#    wind_speed = models.FloatField(default=0)  # en m/s
#
# 2. Créer la migration (dans le terminal) :
#    cd src
#    python manage.py makemigrations
#    python manage.py migrate
#
# 3. Types de champs disponibles :
#    - CharField(max_length=...)   → texte court
#    - TextField()                 → texte long
#    - IntegerField()              → entier
#    - FloatField()                → décimal
#    - BooleanField()              → True/False
#    - DateTimeField()             → date et heure
#    - ForeignKey(OtherModel, ...) → relation vers un autre modèle
#    - JSONField()                 → données JSON (Django 3.1+)
#
# ============================================================================
