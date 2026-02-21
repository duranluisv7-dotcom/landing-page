// =====================================================
// CONFIGURACIÓN SUPABASE
// =====================================================
const SUPABASE_URL = "https://aycyitowvqgdwxvmgkdl.supabase.co";
const SUPABASE_KEY = "sb_publishable_IpXeUSuAyI1roqEXPqqaVQ_CzNUH1yC";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const catalogoContainer = document.getElementById('catalogo');
const cartCountElement = document.getElementById('cart-count');

// =====================================================
// LÓGICA DEL CATÁLOGO
// =====================================================

/**
 * Obtiene los productos desde Supabase
 */
async function obtenerProductos() {
    try {
        const { data: productos, error } = await _supabase
            .from('productos')
            .select('*');

        if (error) throw error;

        console.log("Productos cargados:", productos);
        renderizarProductos(productos);
        if (cartCountElement) {
            cartCountElement.textContent = `${productos.length} productos`;
        }
    } catch (error) {
        console.error("Error cargando productos:", error);
        if (catalogoContainer) {
            catalogoContainer.innerHTML = `
                <div class="col-span-full text-center py-20 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <p class="text-red-400 font-bold">Error al cargar el catálogo.</p>
                    <button onclick="obtenerProductos()" class="mt-4 text-sm underline text-red-300">Reintentar</button>
                </div>
            `;
        }
    }
}

/**
 * Renderiza las tarjetas de productos con efecto Flip 3D
 */
function renderizarProductos(productos) {
    if (!catalogoContainer) return;
    catalogoContainer.innerHTML = '';

    if (!productos || productos.length === 0) {
        catalogoContainer.innerHTML = `
            <div class="col-span-full text-center py-20">
                <p class="text-gray-500">No hay productos disponibles por ahora.</p>
            </div>
        `;
        return;
    }

    productos.forEach((prod, index) => {
        const nombre = prod.nombre || "Producto Premium";
        const precio = prod.precio || "0.00";
        const imagen = prod.imagen_url || prod.foto || "https://via.placeholder.com/600x600?text=No+Imagen";
        const descripcionCompleta = prod.descripcion || prod.resumen || "Selección exclusiva con protección UV de alta fidelidad.";
        const descripcionCorta = descripcionCompleta.length > 60 ? descripcionCompleta.substring(0, 60) + "..." : descripcionCompleta;
        const id = prod.id || index;

        const cardContainer = document.createElement('div');
        cardContainer.className = "product-card-flip group";
        cardContainer.innerHTML = `
            <div class="product-card-inner" onclick="toggleFlip(this)">
                <!-- FRONT SIDE (Image & Short Desc) -->
                <div class="product-card-front glass-card flex flex-col">
                    <div class="product-image-container relative">
                        <img src="${imagen}" alt="${nombre}" 
                             class="product-image"
                             onerror="this.src='https://via.placeholder.com/600x600?text=Error+al+cargar+imagen'">
                        <div class="absolute top-4 left-4 bg-primary/20 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                            TOCAR PARA DETALLES
                        </div>
                    </div>
                    <div class="product-info-front flex-grow">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="product-title">${nombre}</h3>
                            <span class="text-xs font-bold text-primary">$${precio}</span>
                        </div>
                        <p class="product-desc-short">${descripcionCorta}</p>
                        <button onclick="event.stopPropagation(); comprarPorWhatsApp('${id}', '${nombre}')" 
                                class="w-full mt-auto bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-500/20">
                            Venta por WhatsApp
                        </button>
                    </div>
                </div>

                <!-- BACK SIDE (Full Description) -->
                <div class="product-card-back glass-card">
                    <h3 class="text-xl font-bold text-primary mb-4">${nombre}</h3>
                    <div class="w-12 h-1 bg-primary/30 mb-6 mx-auto rounded-full"></div>
                    <p class="text-sm text-gray-300 leading-relaxed mb-8 scrollbar-hide overflow-y-auto max-h-[200px] px-2">
                        ${descripcionCompleta}
                    </p>
                    <div class="border-t border-white/10 pt-6 w-full mt-auto">
                        <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Click en cualquier lado para volver</p>
                        <button onclick="event.stopPropagation(); comprarPorWhatsApp('${id}', '${nombre}')" 
                                class="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                            Venta por WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        `;
        catalogoContainer.appendChild(cardContainer);
    });
}

/**
 * Función para alternar el giro de la tarjeta
 */
function toggleFlip(element) {
    const card = element.closest('.product-card-flip');
    card.classList.toggle('flipped');
}

/**
 * Genera el link de WhatsApp con toda la información necesaria
 */
function comprarPorWhatsApp(id, nombre) {
    const nroWhatsApp = "584241748963";
    const mensaje = encodeURIComponent(`¡Hola Tu Visión Digital! 👋\n\nMe gustaría realizar una compra o consulta sobre este producto:\n🛍️ *Producto:* ${nombre}\n🆔 *ID:* ${id}\n\nQuedo atento a sus indicaciones.`);
    window.open(`https://wa.me/${nroWhatsApp}?text=${mensaje}`, '_blank');
}

// =====================================================
// ANIMACIONES PREMIUM
// =====================================================

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        const duration = Math.random() * 20 + 20;
        particle.style.animationDuration = duration + 's';
        const delay = Math.random() * 10;
        particle.style.animationDelay = delay + 's';
        particlesContainer.appendChild(particle);
    }
}

// Estilos de animaciones clave inyectados dinámicamente
const customStyles = document.createElement('style');
customStyles.textContent = `
    @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .particle {
        position: absolute;
        background: rgba(91, 164, 207, 0.4);
        border-radius: 50%;
        pointer-events: none;
        animation: float-particle 20s infinite ease-in-out;
    }
    @keyframes float-particle {
        0%, 100% { transform: translate(0, 0); opacity: 0.2; }
        50% { transform: translate(50px, -100px); opacity: 0.6; }
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`;
document.head.appendChild(customStyles);

// =====================================================
// INICIALIZACIÓN
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    obtenerProductos();
});

console.log('%c🚀 Tu Visión Digital | Modo Flip-Catalog Activado', 'font-size: 18px; font-weight: bold; color: #5BA4CF;');
