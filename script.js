/* ==========================================================================
   PURPURA BAZAR - LÓGICA PRINCIPAL JAVASCRIPT
   ========================================================================== */

/**
 * =========================================================================
 * ⚙️ CONFIGURACIÓN DEL NEGOCIO (EDITÁ ESTOS VALORES FÁCILMENTE)
 * =========================================================================
 * - whatsappNumber: Ingresá el teléfono con código de país y área (sin 15, guiones ni espacios).
 *   Ejemplo Córdoba: '5493510000000'. Si lo dejás en blanco (''), redirigirá a la app sin número fijo.
 * - instagramUser: Tu usuario de Instagram sin el '@'.
 */
const STORE_CONFIG = {
  storeName: "Purpura Bazar",
  location: "Córdoba, Argentina",
  whatsappNumber: "3512468948",
  instagramUser: "Purpura.bazzar",
  attentionHours: "Lunes a Sábado de 09:00 a 19:30 hs", // Podés modificarlo libremente
  paymentMethods: "Efectivo, Transferencia Bancaria y Mercado Pago"
};

/**
 * =========================================================================
 * 🏷️ CATEGORÍAS DISPONIBLES
 * Cada categoría incluye su imagen representativa para la sección visual.
 * =========================================================================
 */
const categorias = [
  { id: "Cocina", nombre: "Cocina", imagen: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80" },
  { id: "Decoración", nombre: "Decoración", imagen: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=500&q=80" },
  { id: "Hogar", nombre: "Hogar", imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80" },
  { id: "Organización", nombre: "Organización", imagen: "img/Organizacion.jpg" },
  { id: "Bazar", nombre: "Bazar", imagen: "img/Bazar.jpg" },
  { id: "Regalos", nombre: "Regalos", imagen: "img/Regalos.jpg" },
  { id: "Navidad", nombre: "Navidad", imagen: "img/Navidad.jpg" },
  { id: "Belleza y maquillaje", nombre: "Belleza y maquillaje", imagen: "img/Maquillaje.jpg" }
];



/**
 * =========================================================================
 * 📦 CATÁLOGO DE PRODUCTOS
 * =========================================================================
 */

const productos = [

  {
    id: 1,
    nombre: "Agendas",
    categoria: "Organización",
    descripcion: "Agendas 2027.",
    precio: 13000,
    etiqueta: "Destacado",
   imagen: "img/Libretas.jpg"
  },
  {
    id: 2,
    nombre: "Set de PLatos",
    categoria: "Cocina",
    descripcion: "Set de 30 piezas con tacitas incluidas, completo color blanco.",
    precio: 90000,
    etiqueta: "Nuevo",
   imagen: "img/Platos.jpg"
  },
  {
    id: 3,
    nombre: "Focos Led luz calida",
    categoria: "Decoración",
    descripcion: "Cortina de focos de forma esferica de 6 metros, luz cálida. Perfectos para exteriores e interiores.",
    precio: 20000,
    etiqueta: null,
    imagen: "img/Focos.jpg"
  },
  {
    id: 4,
    nombre: "Paleta de maquillaje",
    categoria: "Belleza y maquillaje",
    descripcion: "Paleta con 8 sombras Natural Sclupt.",
    precio: 8000,
    etiqueta: "Ideal Regalo",
    imagen: "img/Sombras.jpg"
  },
  {
    id: 5,
    nombre: "Kit de Utensilios",
    categoria: "Cocina",
    descripcion: "Kit de Utensilios de silicona, varios colores.",
    precio: 15000,
    etiqueta: null,
    imagen: "img/Utensilios.jpg"
  },
  {
    id: 6,
    nombre: "Reloj de pared",
    categoria: "Hogar",
    descripcion: "Reloj de pared moderno con diseño elegante 30CM.",
    precio: 14000,
    etiqueta: "Destacado",
    imagen: "img/Reloj.jpg"
  },
  {
    id: 7,
    nombre: "Velas Decorativas",
    categoria: "Hogar",
    descripcion: "Velas Decorativas en frasco de vidrio.",
    precio: 7500,
    etiqueta: null,
    imagen: "img/Velas.jpg"
  },
  {
    id: 8,
    nombre: "Balanza Digital",
    categoria: "Regalos",
    descripcion: "Balanza digital de vidrio templado, Capacidad maxima 180KG .",
    precio: 12800,
    etiqueta: "nuevo",
    imagen: "img/Balanza.jpg"
  },
  {
    id: 9,
    nombre: "Arbol con Luces",
    categoria: "decoración",
    descripcion: "Arbol decorativo con luces LED.",
    precio: 20000,
    etiqueta: "nuevo",
    imagen: "img/Arbol.jpg"
  },
  {
    id:10,
    nombre: "Set De Baño",
    categoria: "hogar",
    descripcion: "Set de baño de 4 piezas, 16CM.",
    precio: 18500,
    etiqueta: "Popular",
    imagen: "img/Setbaño.jpg"
  },
  {
    id:11,
    nombre: "Maquina de coser",
    categoria: "hogar",
    descripcion: "Mini maquina de coser, marca OM.",
    precio: 22000,
    etiqueta: "",
    imagen: "img/Maquinacoser.jpg"
  }
];

/* ==========================================================================
   ESTADO GLOBAL DEL CARRITO (PERSISTENCIA CON LOCALSTORAGE)
   ========================================================================== */
let carrito = [];

try {
    carrito = JSON.parse(
        localStorage.getItem("Purpura_bazar_cart")
    ) || [];

    if (!Array.isArray(carrito)) {
        carrito = [];
    }

} catch (error) {
    console.error("Error al cargar el carrito:", error);
    carrito = [];
    localStorage.removeItem("Purpura_bazar_cart");
}
let categoriaActiva = "todos";
let terminoBusqueda = "";

/* ==========================================================================
   REFERENCIAS DEL DOM
   ========================================================================== */
const categoriesGrid = document.getElementById("categories-grid");
const categoryChips = document.getElementById("category-chips");
const productsGrid = document.getElementById("products-grid");
const catalogSearch = document.getElementById("catalog-search");
const clearSearchBtn = document.getElementById("clear-search-btn");
const resultsCount = document.getElementById("results-count");

const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartOpenBtn = document.getElementById("cart-open-btn");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartDrawerItems = document.getElementById("cart-drawer-items");
const cartBadge = document.getElementById("cart-badge");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartCheckoutWaBtn = document.getElementById("cart-checkout-wa-btn");
const cartClearBtn = document.getElementById("cart-clear-btn");

const mobileToggleBtn = document.getElementById("mobile-toggle-btn");
const navMenu = document.getElementById("nav-menu");
const mobileIcon = document.getElementById("mobile-icon");

/* ==========================================================================
   HELPERS & FORMATEADORES MONETARIOS DE ARGENTINA
   ========================================================================== */
const formatCurrency = (val) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(val);
};

/* Construcción de URLs dinámicas para WhatsApp */
function getWhatsAppLink(customMessage) {
  const encodedMsg = encodeURIComponent(customMessage);
  if (STORE_CONFIG.whatsappNumber && STORE_CONFIG.whatsappNumber.trim() !== "") {
    return `https://wa.me/${STORE_CONFIG.whatsappNumber.trim()}?text=${encodedMsg}`;
  }
  // Enlace genérico si aún no configuró el número
  return `https://api.whatsapp.com/send?text=${encodedMsg}`;
}

/* ==========================================================================
   CONFIGURACIÓN INICIAL DE ENLACES Y DATOS EDITABLES
   ========================================================================== */
function setupStoreInfo() {
  // Horarios y ubicación en pantalla
  const displayLocation = document.getElementById("display-location");
  const displayHours = document.getElementById("display-hours");
  const displayPayments = document.getElementById("display-payments");
  if (displayLocation) displayLocation.textContent = STORE_CONFIG.location;
  if (displayHours) displayHours.textContent = STORE_CONFIG.attentionHours;
  if (displayPayments) displayPayments.textContent = STORE_CONFIG.paymentMethods;

  // Enlaces a WhatsApp
  const generalMsg = `¡Hola ${STORE_CONFIG.storeName}! Te escribo desde la tienda online. Quiero hacer una consulta sobre sus productos en ${STORE_CONFIG.location}.`;
  const generalWaUrl = getWhatsAppLink(generalMsg);

  const headerWaBtn = document.getElementById("header-whatsapp-btn");
  const contactWaBtn = document.getElementById("contact-whatsapp-btn");
  const floatingWaBtn = document.getElementById("floating-wa-btn");
  const footerWaLink = document.getElementById("footer-wa-link");

  if (headerWaBtn) headerWaBtn.href = generalWaUrl;
  if (contactWaBtn) contactWaBtn.href = generalWaUrl;
  if (floatingWaBtn) floatingWaBtn.href = generalWaUrl;
  if (footerWaLink) footerWaLink.href = generalWaUrl;

  // Enlaces a Instagram
  const igUrl = STORE_CONFIG.instagramUser ? `https://instagram.com/${STORE_CONFIG.instagramUser}` : "https://instagram.com";
  const contactIgBtn = document.getElementById("contact-instagram-btn");
  const footerIgLink = document.getElementById("footer-ig-link");
  if (contactIgBtn) contactIgBtn.href = igUrl;
  if (footerIgLink) footerIgLink.href = igUrl;

  // Año actual en Footer
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ==========================================================================
   RENDERIZADO DE CATEGORÍAS
   ========================================================================== */
function renderCategories() {
  if (!categoriesGrid) return;

  categoriesGrid.innerHTML = categorias.map(cat => `
    <div class="category-card" onclick="seleccionarCategoria('${cat.id}')">
      <img src="${cat.imagen}" alt="${cat.nombre}" loading="lazy">
      <div class="category-card-overlay">
        <h3 class="category-card-title">${cat.nombre}</h3>
        <span class="category-card-cta">Explorar <i class="ph ph-arrow-right"></i></span>
      </div>
    </div>
  `).join("");

  // Crear botones de filtro (chips)
  renderCategoryChips();
}

function renderCategoryChips() {
  if (!categoryChips) return;

  let chipsHTML = `
    <button class="category-chip ${categoriaActiva === 'todos' ? 'active' : ''}" onclick="seleccionarCategoria('todos')">
      Todos
    </button>
  `;

  chipsHTML += categorias.map(cat => `
    <button class="category-chip ${categoriaActiva === cat.id ? 'active' : ''}" onclick="seleccionarCategoria('${cat.id}')">
      ${cat.nombre}
    </button>
  `).join("");

  categoryChips.innerHTML = chipsHTML;
}

function seleccionarCategoria(idCat) {
  categoriaActiva = idCat;
  renderCategoryChips();
  renderProducts();

  // Desplazar suavemente hasta el catálogo si el usuario hizo clic en la tarjeta de arriba
  const catalogoSec = document.getElementById("productos");
  if (catalogoSec) {
    catalogoSec.scrollIntoView({ behavior: "smooth" });
  }
}

/* ==========================================================================
   RENDERIZADO DEL CATÁLOGO DE PRODUCTOS
   ========================================================================== */
function renderProducts() {
  if (!productsGrid) return;

  const filtrados = productos.filter(p => {
    const coincideCategoria = (categoriaActiva === "todos") || (p.categoria.toLowerCase() === categoriaActiva.toLowerCase());
    const coincideBusqueda = p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                             p.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  // Indicador de resultados
  if (resultsCount) {
    resultsCount.textContent = `Mostrando ${filtrados.length} ${filtrados.length === 1 ? 'producto' : 'productos'}`;
  }

  if (filtrados.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state">
        <i class="ph ph-magnifying-glass"></i>
        <h3>No encontramos productos</h3>
        <p>Probá cambiando las palabras de búsqueda o eligiendo otra categoría.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtrados.map(prod => {
    const badgeHTML = prod.etiqueta 
      ? `<span class="product-badge-tag">${prod.etiqueta}</span>` 
      : "";

    return `
      <article class="product-card" data-id="${prod.id}">
        <div class="product-thumb">
          ${badgeHTML}
          <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy">
        </div>
        <div class="product-body">
          <span class="product-category-label">${prod.categoria}</span>
          <h3 class="product-name">${prod.nombre}</h3>
          <p class="product-desc">${prod.descripcion}</p>
          <div class="product-price-tag">${formatCurrency(prod.precio)}</div>
          
          <div class="product-btn-group">
            <button class="btn-add-bag" onclick="agregarAlCarrito(${prod.id})">
              <i class="ph ph-bag"></i> Agregar al carrito
            </button>
            <button class="btn-consult-wa" onclick="consultarIndividualWA('${prod.nombre}', ${prod.precio})">
              <i class="ph ph-whatsapp-logo"></i> Consultar
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/* Búsqueda */
if (catalogSearch) {
  catalogSearch.addEventListener("input", (e) => {
    terminoBusqueda = e.target.value.trim();
    if (clearSearchBtn) {
      clearSearchBtn.style.display = terminoBusqueda.length > 0 ? "block" : "none";
    }
    renderProducts();
  });
}

if (clearSearchBtn) {
  clearSearchBtn.addEventListener("click", () => {
    catalogSearch.value = "";
    terminoBusqueda = "";
    clearSearchBtn.style.display = "none";
    renderProducts();
  });
}

/* ==========================================================================
   LÓGICA DEL CARRITO DE COMPRAS INTERACTIVO
   ========================================================================== */
function guardarCarrito() {
  localStorage.setItem("Purpura_bazar_cart", JSON.stringify(carrito));
  actualizarUIcarrito();
}

function agregarAlCarrito(idProducto) {
  const prod = productos.find(p => p.id === idProducto);
  if (!prod) return;

  const existente = carrito.find(item => item.id === idProducto);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      imagen: prod.imagen,
      cantidad: 1
    });
  }

  guardarCarrito();
  abrirCarrito();
}

function cambiarCantidad(idProducto, delta) {
  const item = carrito.find(i => i.id === idProducto);
  if (!item) return;

  item.cantidad += delta;
  if (item.cantidad <= 0) {
    eliminarDelCarrito(idProducto);
    return;
  }

  guardarCarrito();
}

function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter(i => i.id !== idProducto);
  guardarCarrito();
}

function vaciarCarrito() {
  if (carrito.length === 0) return;
  if (confirm("¿Estás seguro de que querés vaciar tu carrito?")) {
    carrito = [];
    guardarCarrito();
  }
}

function actualizarUIcarrito() {
  // Cantidad total de artículos
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  if (cartBadge) cartBadge.textContent = totalItems;

  // Suma total
  const totalMonto = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  if (cartSubtotal) cartSubtotal.textContent = formatCurrency(totalMonto);
  if (cartTotalPrice) cartTotalPrice.textContent = formatCurrency(totalMonto);

  // Renderizar listado del Drawer
  if (!cartDrawerItems) return;

  if (carrito.length === 0) {
    cartDrawerItems.innerHTML = `
      <div class="empty-state" style="padding: 2.5rem 0;">
        <i class="ph ph-bag-simple"></i>
        <h4>Tu carrito está vacío</h4>
        <p style="font-size: 0.85rem;">Encontrá productos para tu hogar en nuestro catálogo.</p>
      </div>
    `;
    if (cartCheckoutWaBtn) {
      cartCheckoutWaBtn.style.opacity = "0.5";
      cartCheckoutWaBtn.style.pointerEvents = "none";
    }
    return;
  }

  if (cartCheckoutWaBtn) {
    cartCheckoutWaBtn.style.opacity = "1";
    cartCheckoutWaBtn.style.pointerEvents = "auto";
  }

  cartDrawerItems.innerHTML = carrito.map(item => `
    <div class="cart-item-row">
      <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-name">${item.nombre}</h4>
        <div class="cart-item-price">${formatCurrency(item.precio)}</div>
        <div class="cart-item-controls">
          <button class="qty-control-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
          <span class="cart-item-qty">${item.cantidad}</span>
          <button class="qty-control-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
          <button class="item-delete-btn" onclick="eliminarDelCarrito(${item.id})" title="Quitar producto">
            <i class="ph ph-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function abrirCarrito() {
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
  }
}

function cerrarCarrito() {
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
  }
}

// Eventos de apertura y cierre
if (cartOpenBtn) cartOpenBtn.addEventListener("click", abrirCarrito);
if (cartCloseBtn) cartCloseBtn.addEventListener("click", cerrarCarrito);
if (cartOverlay) cartOverlay.addEventListener("click", cerrarCarrito);
if (cartClearBtn) cartClearBtn.addEventListener("click", vaciarCarrito);

/* ==========================================================================
   CONSULTAS Y CHECKOUT HACIA WHATSAPP
   ========================================================================== */

/* 1. Consulta individual por tarjeta */
function consultarIndividualWA(nombreProd, precioProd) {
  const msg = `¡Hola ${STORE_CONFIG.storeName}! 👋\n\nQuería consultar por este producto que vi en su web:\n📌 *${nombreProd}*\n💰 Precio: ${formatCurrency(precioProd)}\n\n¿Tienen disponibilidad para coordinar en ${STORE_CONFIG.location}? Muchas gracias.`;
  window.open(getWhatsAppLink(msg), "_blank");
}

/* 2. Envío de pedido estructurado desde el carrito */
if (cartCheckoutWaBtn) {
  cartCheckoutWaBtn.addEventListener("click", () => {
    if (carrito.length === 0) return;

    const total = carrito.reduce((acc, it) => acc + (it.precio * it.cantidad), 0);
    let msg = `¡Hola ${STORE_CONFIG.storeName}! 🛍️ Deseo realizar el siguiente pedido:\n\n`;

    carrito.forEach((it, index) => {
      msg += `${index + 1}. *${it.nombre}*\n`;
      msg += `   • Cantidad: ${it.cantidad}\n`;
      msg += `   • Subtotal: ${formatCurrency(it.precio * it.cantidad)}\n\n`;
    });

    msg += `------------------------------\n`;
    msg += `💳 *Total Estimado: ${formatCurrency(total)}*\n`;
    msg += `📍 *Ubicación de entrega/retiro:* ${STORE_CONFIG.location}\n`;
    msg += `------------------------------\n`;
    msg += `¿Podrían confirmarme disponibilidad y medios de pago para coordinar? ¡Gracias!`;

    window.open(getWhatsAppLink(msg), "_blank");
  });
}

/* ==========================================================================
   MENÚ MÓVIL Y RESALTADO DE NAVEGACIÓN
   ========================================================================== */
if (mobileToggleBtn) {
  mobileToggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const isOpen = navMenu.classList.contains("active");
    mobileIcon.setAttribute("class", isOpen ? "ph ph-x" : "ph ph-list");
  });
}

// Cerrar menú al hacer clic en un enlace de navegación
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("active");
      if (mobileIcon) mobileIcon.setAttribute("class", "ph ph-list");
    }
  });
});

/* ==========================================================================
   INICIALIZACIÓN AL CARGAR LA PÁGINA
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  setupStoreInfo();
  renderCategories();
  renderProducts();
  actualizarUIcarrito();
});