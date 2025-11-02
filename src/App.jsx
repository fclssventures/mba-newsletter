import React, { useState, useEffect } from 'react';
import { Mail, TrendingUp, Package, Star, Menu, X, Send, BarChart3, Radio, Megaphone, Users } from 'lucide-react';

// 🔥 TRACKING SYSTEM
const trackEvent = (category, action, label = '') => {
  const event = {
    timestamp: new Date().toISOString(),
    category,
    action,
    label,
    location: 'Maputo, MZ',
  };
  
  console.log('📊 Event Tracked:', event);
  
  const events = JSON.parse(localStorage.getItem('mba_analytics') || '[]');
  events.push(event);
  localStorage.setItem('mba_analytics', JSON.stringify(events));
};

const getTopProducts = () => {
  return [
    { name: 'Cerveja 2M', sales: 3420, trend: '+12%', brand: 'CDM', category: 'Cerveja' },
    { name: 'Vinho Duas Quintas', sales: 1850, trend: '+8%', brand: 'Sogrape', category: 'Vinho' },
  ];
};

const getNewArrivals = () => {
  return [
    { name: 'Gin Tanqueray London Dry', size: '750ml', type: 'Gin', brand: 'Diageo', sponsor: true },
    { name: 'Cerveja Sagres Radler', size: '330ml', type: 'Cerveja', brand: 'Heineken', sponsor: false },
    { name: 'Whiskey Jameson Black Barrel', size: '700ml', type: 'Whiskey', brand: 'Pernod Ricard', sponsor: true },
  ];
};

// APIBA Members (MBA's clients)
const apibaMembers = [
  { name: 'CDM', fullName: 'Cervejas de Moçambique', brands: ['2M', 'Laurentina', 'Manica', 'Impala', 'Budweiser', 'Castle Lite'] },
  { name: 'Pernod Ricard', fullName: 'Pernod Ricard Moçambique', brands: ['Jameson', 'Chivas Regal', 'Absolut', 'Beefeater', 'Havana Club'] },
  { name: 'Heineken', fullName: 'Heineken Moçambique', brands: ['Heineken', 'Amstel', 'Sagres'] },
  { name: 'Diageo', fullName: 'Diageo Moçambique', brands: ['Johnnie Walker', 'Smirnoff', 'Captain Morgan', 'Guinness', 'Tanqueray'] },
  { name: 'Socimpex', fullName: 'Socimpex Moçambique', brands: ['Várias marcas importadas'] },
];

export default function App() {
  const [activeView, setActiveView] = useState('newsletter');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    trackEvent('page', 'load', activeView);
  }, [activeView]);

  const handleProductClick = (productName, brand) => {
    trackEvent('product', 'click', `${productName} (${brand})`);
  };

  const handleBrandClick = (brandName) => {
    trackEvent('brand', 'click', brandName);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    trackEvent('feedback', 'submit', feedbackText);
    alert('✅ Obrigado! A tua mensagem foi enviada aos nossos clientes da APIBA.');
    setFeedbackText('');
    setShowFeedback(false);
  };

  const loadAnalytics = () => {
    const events = JSON.parse(localStorage.getItem('mba_analytics') || '[]');
    setAnalytics(events);
  };

  const NewsletterView = () => {
    const topProducts = getTopProducts();
    const newArrivals = getNewArrivals();

    return (
      <div className="max-w-2xl mx-auto">
        {/* MBA Header - Content Agency Identity */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 mb-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <span className="text-gray-900 text-2xl font-bold">MBA</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Mozambican Beverage Agency</h2>
              <p className="text-sm text-gray-300">Agência de Informação e Conteúdo</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs bg-black/20 rounded p-3">
            <div className="text-center">
              <Radio className="w-4 h-4 mx-auto mb-1 opacity-75" />
              <div className="font-medium">Espaço</div>
              <div className="text-gray-400">Exposição</div>
            </div>
            <div className="text-center">
              <Megaphone className="w-4 h-4 mx-auto mb-1 opacity-75" />
              <div className="font-medium">Mensagens</div>
              <div className="text-gray-400">Vinculadas</div>
            </div>
            <div className="text-center">
              <Users className="w-4 h-4 mx-auto mb-1 opacity-75" />
              <div className="font-medium">Servidor</div>
              <div className="text-gray-400">Conteúdo</div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 border-t border-gray-700 pt-3">
            Conectando produtores e importadores (APIBA) ao mercado Moçambicano através de informação inteligente.
          </p>
        </div>

        {/* Newsletter Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Newsletter Mensal · Parceiros APIBA</span>
              <span className="text-xs text-gray-400">Novembro 2025</span>
            </div>
            <h1 className="text-2xl font-light text-gray-900 mb-1">
              Novembro chegou — e com ele, o calor e as bebidas certas
            </h1>
            <p className="text-xs text-gray-500 italic mt-2">
              Conteúdo produzido pela MBA para os membros da APIBA
            </p>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Novembro em Maputo é assim: o calor volta devagar, as tardes esticam, e as conversas ganham tempo. 
              Este mês os nossos parceiros trouxeram opções novas e favoritos de volta. Aqui está o que há para descobrir.
            </p>

            {/* Sponsored/Featured Products */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-medium text-gray-900">Em Destaque Este Mês</h2>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded ml-auto">Patrocinado</span>
              </div>
              
              <div className="space-y-4">
                {newArrivals.filter(p => p.sponsor).map((product, i) => (
                  <div 
                    key={i}
                    className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-all border border-blue-200"
                    onClick={() => handleProductClick(product.name, product.brand)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{product.name} ({product.size})</h3>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleBrandClick(product.brand); }}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          {product.brand}
                        </button>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{product.type}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {product.type === 'Gin' && 'Clássico inglês, limpo, com notas de zimbro. Funciona bem com tónica ou num G&T simples.'}
                      {product.type === 'Whiskey' && 'Suave, com final de baunilha e carvalho. Para quem gosta de whiskey irlandês mas procura algo com mais corpo.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* New Arrivals (Non-sponsored) */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-medium text-gray-900">Novos em Stock</h2>
              </div>
              
              <div className="space-y-3">
                {newArrivals.filter(p => !p.sponsor).map((product, i) => (
                  <div 
                    key={i}
                    className="border-l-2 border-gray-300 pl-4 cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => handleProductClick(product.name, product.brand)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">{product.name} ({product.size})</h3>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleBrandClick(product.brand); }}
                        className="text-xs text-gray-600 hover:text-blue-600 hover:underline"
                      >
                        {product.brand}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {product.type === 'Cerveja' && 'Leve, com toque cítrico. Perfeita para quem quer algo refrescante sem o peso de uma imperial completa.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Intelligence */}
            <div className="bg-amber-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-medium text-gray-900">Inteligência de Mercado</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-700 italic">
                  Com base nos dados dos nossos parceiros APIBA, estas são as categorias em crescimento este mês:
                </p>
                {topProducts.map((product, i) => (
                  <div 
                    key={i}
                    className="border-l-2 border-amber-300 pl-4 cursor-pointer hover:border-amber-600 transition-colors"
                    onClick={() => handleProductClick(product.name, product.brand)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleBrandClick(product.brand); }}
                          className="text-xs text-gray-600 hover:text-blue-600 hover:underline"
                        >
                          {product.brand}
                        </button>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium">{product.trend}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {i === 0 ? 'Lidera nas vendas. Local, fresca, e presente em todo o lado.' : 
                       'Crescimento consistente. Português, acessível, versatil.'}
                    </p>
                  </div>
                ))}
                <div className="bg-white rounded p-3 text-sm text-gray-600 border border-amber-200">
                  <strong>Observação:</strong> Sextas-feiras mostram picos de compra. Possível ritual de fim de semana.
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 mb-4">
                A MBA conecta a informação dos produtores e importadores ao mercado. Para consultas directas, 
                contacte os nossos parceiros APIBA ou ligue para <span className="font-medium">+258 84 XXX XXXX</span>.
              </p>
            </div>

            {/* Feedback */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700 mb-3">
                <strong>💬 Feedback ao mercado:</strong> Há algo que procura e não encontra? A MBA transmite a mensagem aos nossos parceiros.
              </p>
              {!showFeedback ? (
                <button 
                  onClick={() => setShowFeedback(true)}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar feedback aos parceiros APIBA
                </button>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                  <input 
                    type="text"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Ex: Vodka Grey Goose, Cerveja Corona..."
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    required
                  />
                  <div className="flex gap-2">
                    <button 
                      type="submit"
                      className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Enviar à APIBA
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowFeedback(false)}
                      className="text-sm bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* APIBA Partners */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-1">Parceiros APIBA</h3>
            <p className="text-xs text-gray-600">Clientes da MBA · Produtores e Importadores de Bebidas Alcoólicas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apibaMembers.map((member, i) => (
              <button
                key={i}
                onClick={() => handleBrandClick(member.name)}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
              >
                <div className="font-medium text-gray-900 mb-1">{member.name}</div>
                <div className="text-xs text-gray-600 mb-2">{member.fullName}</div>
                <div className="flex flex-wrap gap-1">
                  {member.brands.slice(0, 3).map((brand, j) => (
                    <span key={j} className="text-xs bg-white text-gray-700 px-2 py-1 rounded border border-gray-200">
                      {brand}
                    </span>
                  ))}
                  {member.brands.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{member.brands.length - 3}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AnalyticsView = () => {
    useEffect(() => {
      loadAnalytics();
    }, []);

    const productClicks = analytics.filter(e => e.category === 'product');
    const brandClicks = analytics.filter(e => e.category === 'brand');
    const feedbacks = analytics.filter(e => e.category === 'feedback');

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-2">Dashboard de Performance</h2>
          <p className="text-gray-600">Métricas de engagement para clientes APIBA</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-3xl font-light text-gray-900 mb-1">{analytics.length}</div>
            <div className="text-sm text-gray-600">Total eventos</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-3xl font-light text-gray-900 mb-1">{productClicks.length}</div>
            <div className="text-sm text-gray-600">Produtos clicados</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-3xl font-light text-gray-900 mb-1">{brandClicks.length}</div>
            <div className="text-sm text-gray-600">Marcas clicadas</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-3xl font-light text-gray-900 mb-1">{feedbacks.length}</div>
            <div className="text-sm text-gray-600">Feedbacks</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Produtos Mais Clicados</h3>
            <div className="space-y-2">
              {productClicks.slice(-5).reverse().map((event, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                  <span className="text-gray-700">{event.label}</span>
                  <span className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleTimeString('pt-PT')}</span>
                </div>
              ))}
              {productClicks.length === 0 && (
                <p className="text-sm text-gray-500 italic">Nenhum clique ainda</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Marcas Mais Clicadas</h3>
            <div className="space-y-2">
              {brandClicks.slice(-5).reverse().map((event, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                  <span className="text-gray-700">{event.label}</span>
                  <span className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleTimeString('pt-PT')}</span>
                </div>
              ))}
              {brandClicks.length === 0 && (
                <p className="text-sm text-gray-500 italic">Nenhum clique ainda</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Feedback do Mercado</h3>
          <div className="space-y-2">
            {feedbacks.map((event, i) => (
              <div key={i} className="p-3 bg-blue-50 rounded text-sm border border-blue-100">
                <div className="font-medium text-gray-900">{event.label}</div>
                <div className="text-xs text-gray-500 mt-1">{new Date(event.timestamp).toLocaleString('pt-PT')}</div>
              </div>
            ))}
            {feedbacks.length === 0 && (
              <p className="text-sm text-gray-500 italic">Nenhum feedback recebido</p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg border border-blue-200 p-6">
          <h3 className="font-medium text-gray-900 mb-2">Para Clientes APIBA</h3>
          <p className="text-sm text-gray-600 mb-3">
            Estes dados mostram como o mercado interage com as vossas mensagens. A MBA fornece o espaço e a inteligência — 
            vocês fornecem os produtos e a estratégia.
          </p>
          <p className="text-xs text-gray-500">
            Próximos passos: Relatórios mensais personalizados por marca, análise de tendências, e recomendações de conteúdo.
          </p>
        </div>
      </div>
    );
  };

  const SystemView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-light text-gray-900 mb-2">Como Funciona a MBA</h2>
        <p className="text-gray-600">Agência de Informação para o Sector de Bebidas</p>
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-8 mb-8">
        <h3 className="text-xl font-medium mb-4">O Modelo MBA</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <Radio className="w-8 h-8 mb-3 opacity-75" />
            <h4 className="font-medium mb-2">Espaço & Exposição</h4>
            <p className="text-sm text-gray-300">
              Fornecemos plataformas (newsletter, web, eventos) onde marcas ganham visibilidade.
            </p>
          </div>
          <div>
            <Megaphone className="w-8 h-8 mb-3 opacity-75" />
            <h4 className="font-medium mb-2">Vinculamos Mensagens</h4>
            <p className="text-sm text-gray-300">
              Conectamos as mensagens dos produtores ao público certo — consumidores, bares, distribuidores.
            </p>
          </div>
          <div>
            <Users className="w-8 h-8 mb-3 opacity-75" />
            <h4 className="font-medium mb-2">Servidores de Conteúdo</h4>
            <p className="text-sm text-gray-300">
              Não vendemos bebidas. Distribuímos informação, insights e inteligência de mercado.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            <strong>A MBA é a ponte entre APIBA e o mercado.</strong> Os produtores fornecem dados e produtos. 
            Nós transformamos isso em narrativa, análise e exposição.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-3">Fluxo de Informação</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Clientes APIBA → Dados de produtos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>MBA → Análise + Narrativa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Newsletter → Mercado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Feedback → De volta aos clientes</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-3">Serviços MBA</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>Newsletter mensal</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              <span>Relatórios de engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span>Inteligência de mercado</span>
            </div>
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-gray-400" />
              <span>Gestão de mensagens</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Próximos Passos de Evolução</h3>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium shrink-0">1</div>
            <div>
              <div className="font-medium text-gray-900">Portal B2B para Clientes</div>
              <div className="text-gray-600">Dashboard onde APIBA members vêem analytics em tempo real das suas marcas</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium shrink-0">2</div>
            <div>
              <div className="font-medium text-gray-900">Conteúdo Automatizado</div>
              <div className="text-gray-600">Claude API gera edições baseadas em dados de vendas dos clientes</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium shrink-0">3</div>
            <div>
              <div className="font-medium text-gray-900">Slots Patrocinados</div>
              <div className="text-gray-600">Secções "Em Destaque" pagas para maior exposição de produtos específicos</div>
</div>
</div>
<div className="flex gap-3">
<div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium shrink-0">4</div>
<div>
<div className="font-medium text-gray-900">Relatórios de Mercado</div>
<div className="text-gray-600">Vendas mensais como serviço premium para distribuidores e bares</div>
</div>
</div>
</div>
</div>
</div>
);
return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-16">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center">
<span className="text-white text-base font-bold">MBA</span>
</div>
<div>
<h1 className="text-base font-bold text-gray-900">MBA</h1>
<p className="text-xs text-gray-500">Agência de Informação</p>
</div>
</div> <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setActiveView('newsletter')}
            className={`text-sm transition-colors ${
              activeView === 'newsletter' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Newsletter
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`text-sm transition-colors ${
              activeView === 'analytics' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveView('system')}
            className={`text-sm transition-colors ${
              activeView === 'system' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sistema
          </button>
        </nav>

        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden py-4 border-t border-gray-200">
          <button
            onClick={() => { setActiveView('newsletter'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Newsletter
          </button>
          <button
            onClick={() => { setActiveView('analytics'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Analytics
          </button>
          <button
            onClick={() => { setActiveView('system'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Sistema
          </button>
        </nav>
      )}
    </div>
  </header>

  <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {activeView === 'newsletter' && <NewsletterView />}
    {activeView === 'analytics' && <AnalyticsView />}
    {activeView === 'system' && <SystemView />}
  </main>

  <footer className="bg-white border-t border-gray-200 mt-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">MBA</h4>
          <p className="text-gray-600 text-xs leading-relaxed">
            Agência de informação e conteúdo para o sector de bebidas em Moçambique. 
            Servidor de conteúdo para membros da APIBA.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Contacto</h4>
          <p className="text-gray-600 text-xs">+258 84 XXX XXXX</p>
          <p className="text-gray-600 text-xs">Av. Julius Nyerere, Maputo</p>
          <p className="text-gray-600 text-xs mt-2">Para consultas comerciais, contacte os nossos parceiros APIBA</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">O Que Fazemos</h4>
          <p className="text-gray-600 text-xs">✓ Espaço e exposição</p>
          <p className="text-gray-600 text-xs">✓ Vinculação de mensagens</p>
          <p className="text-gray-600 text-xs">✓ Servidor de conteúdo</p>
          <p className="text-gray-600 text-xs">✓ Inteligência de mercado</p>
        </div>
      </div>
    </div>
  </footer>
</div>
