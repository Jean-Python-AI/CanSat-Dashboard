"""
VUE - Page d'accueil de l'API
=============================

Cette vue affiche une page HTML avec :
- La liste de tous les launches
- Les URLs de toutes les API disponibles pour chaque launch

Accessible via : GET /data/view/
"""

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import Launch


@csrf_exempt
def showData(request):
    """
    GET /data/view/
    
    Affiche une page HTML avec tous les launches et leurs API.
    """
    
    # Récupérer tous les launches, triés par date (plus récent en premier)
    launches = Launch.objects.all().order_by('-created_at')
    
    # Construire le HTML
    html = """<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CanSat API - Launches</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .launch {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .launch h2 {
            margin-top: 0;
            color: #2c3e50;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .launch .id {
            color: #7f8c8d;
            font-size: 0.8em;
            font-weight: normal;
        }
        .status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.85em;
            font-weight: bold;
        }
        .status.recording {
            background: #2ecc71;
            color: white;
        }
        .status.stopped {
            background: #e74c3c;
            color: white;
        }
        .status-box {
            background: #ecf0f1;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
        }
        .api-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 10px;
            margin-top: 15px;
        }
        .api-item {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            border-left: 3px solid #3498db;
        }
        .api-item .method {
            font-weight: bold;
            color: #3498db;
            margin-right: 8px;
        }
        .api-item .url {
            font-family: monospace;
            color: #2c3e50;
            word-break: break-all;
        }
        .api-item .desc {
            font-size: 0.85em;
            color: #7f8c8d;
            margin-top: 5px;
        }
        .no-launches {
            text-align: center;
            color: #7f8c8d;
            padding: 40px;
        }
        .base-url {
            background: #2c3e50;
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <h1>🛰️ CanSat API</h1>
    
    <div class="base-url">
        Base URL: <strong>http://localhost:8000/data/</strong>
    </div>
"""
    
    if not launches:
        html += """
    <div class="no-launches">
        <p>Aucun launch trouvé.</p>
        <p>Pour créer un launch, envoyez une requête POST sur <code>/data/start/</code></p>
    </div>
"""
    else:
        for launch in launches:
            status_class = "recording" if launch.is_recording else "stopped"
            status_text = "🔴 Enregistrement" if launch.is_recording else "⏹️ Arrêté"
            
            html += f"""
    <div class="launch">
        <h2>{launch.name} <span class="id">#{launch.id}</span> <span class="status {status_class}">{status_text}</span></h2>
        
        <div class="status-box">
            <strong>Créé le:</strong> {launch.created_at.strftime('%d/%m/%Y à %H:%M:%S')}
        </div>
        
        <h3>📡 API disponibles :</h3>
        <div class="api-list">
            <div class="api-item">
                <span class="method">GET</span>
                <span class="url">/data/api/{launch.id}/altitude/</span>
                <div class="desc">Données d'altitude pour graphique</div>
            </div>
            <div class="api-item">
                <span class="method">GET</span>
                <span class="url">/data/api/{launch.id}/temperature/</span>
                <div class="desc">Données de température pour graphique</div>
            </div>
            <div class="api-item">
                <span class="method">GET</span>
                <span class="url">/data/api/{launch.id}/pressure/</span>
                <div class="desc">Données de pression pour graphique</div>
            </div>
            <div class="api-item">
                <span class="method">GET</span>
                <span class="url">/data/api/{launch.id}/latitude/</span>
                <div class="desc">Données GPS latitude</div>
            </div>
            <div class="api-item">
                <span class="method">GET</span>
                <span class="url">/data/api/{launch.id}/longitude/</span>
                <div class="desc">Données GPS longitude</div>
            </div>
            <div class="api-item">
                <span class="method">GET</span>
                <span class="url">/data/api/{launch.id}/bonus_datas/</span>
                <div class="desc">Statistiques complètes (max altitude, accel, vitesse chute, etc.)</div>
            </div>
            <div class="api-item">
                <span class="method">POST</span>
                <span class="url">/data/launch/{launch.id}/update/</span>
                <div class="desc">Mettre à jour le nom (JSON: &#123;"name": "nouveau nom"&#125;)</div>
            </div>
            <div class="api-item">
                <span class="method">POST</span>
                <span class="url">/data/launch/{launch.id}/stop/</span>
                <div class="desc">Arrêter l'enregistrement</div>
            </div>
            <div class="api-item">
                <span class="method">POST</span>
                <span class="url">/data/launch/{launch.id}/start/</span>
                <div class="desc">Démarrer l'enregistrement</div>
            </div>
            <div class="api-item">
                <span class="method">DELETE</span>
                <span class="url">/data/launch/{launch.id}/delete/</span>
                <div class="desc">Supprimer le launch et toutes ses données</div>
            </div>
        </div>
    </div>
"""
    
    html += """
    <div class="launch">
        <h2>📋 API Globales</h2>
        <div class="api-list">
            <div class="api-item">
                <span class="method">GET</span>
                <span class="url">/data/launches/</span>
                <div class="desc">Liste de tous les launches avec leur statut</div>
            </div>
            <div class="api-item">
                <span class="method">POST</span>
                <span class="url">/data/start/</span>
                <div class="desc">Créer un nouveau launch (JSON: &#123;"name": "Mon Launch"&#125;)</div>
            </div>
            <div class="api-item">
                <span class="method">POST</span>
                <span class="url">/data/read/</span>
                <div class="desc">Envoyer des données de télémesure</div>
            </div>
        </div>
    </div>

</body>
</html>
"""
    
    return HttpResponse(html)
