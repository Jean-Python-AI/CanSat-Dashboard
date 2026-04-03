
def Altitude(t):
    # Constantes
    g = 9.8  # m/s²
    a = 20.0  # Accélération nette (m/s²)
    h_max = 500.0  # Altitude cible (m)
    
    # Calcul de t_b (temps de propulsion)
    from math import sqrt
    alpha = 0.5 * a + (a ** 2) / (2 * g)
    t_b = sqrt(h_max / alpha)  # ≈4.81 s
    
    # Vitesse au burnout
    v_b = a * t_b
    
    # Temps à l'apogée
    t_apogee = t_b + v_b / g  # ≈14.62 s
    
    # Altitude au burnout
    h_b = 0.5 * a * t_b ** 2
    
    if t < 0:
        return 0.0
    
    if 0 <= t <= t_b:
        # Phase propulsion
        return 0.5 * a * t ** 2
    
    elif t_b < t <= t_apogee:
        # Montée balistique
        delta_t = t - t_b
        return h_b + v_b * delta_t - 0.5 * g * delta_t ** 2
    
    else:
        # Descente avec parachute (vitesse constante -8 m/s)
        v_terminal = -8.0  # m/s
        delta_t = t - t_apogee
        altitude = h_max + v_terminal * delta_t
        return max(altitude, 0.0)  # Ne descend pas en dessous de 0