import React, { useState, useEffect } from 'react';
import { Mail, TrendingUp, Package, Star, ChevronRight, Menu, X, Send, BarChart3, Building2 } from 'lucide-react';

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
    { name: 'Cerveja 2M', sales: 3420, trend: '+12%', brand: 'CDM' },
    { name: 'Vinho Duas Quintas', sales: 1850, trend: '+8%', brand: 'Sogrape' },
  ];
};

const getNewArrivals = () => {
  return [
    { name: 'Gin Tanqueray London Dry', size: '750ml', type: 'Gin', brand: 'Diageo' },
    { name: 'Cerveja Sagres Radler', size: '330ml', type: 'Cerveja', brand: 'Heineken' },
    { name: 'Whiskey Jameson Black Barrel', size: '700ml', type: 'Whiskey', brand: 'Pernod Ricard' },
  ];
};

// APIBA Members
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

  const handleProductClick = (productName) => {
    trackEvent('product', 'click', productName);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    trackEvent('feedback', 'submit', feedbackText);
    alert('✅ Obrigado! O teu pedido foi registado.');
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
        {/* MBA Header with Logo */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">MB</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">MBA</h2>
              <p className="text-sm text-gray-600">Mozambican Beverage Agency</p>
              <p className="text-xs text-gray-500 mt-1">Membro da APIBA</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Building2 className="w-4 h-4" />
            <span>Representando produtores e importadores de bebidas em Moçambique</span>
          </div>
        </div>

        {/* Newsletter Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Newsletter Mensal</span>
              <span className="text-xs text-gray-400">Novembro 2025</span>
            </div>
            <h1 className="text-2xl font-light text-gray-900 mb-1">
              Novembro chegou — e com ele, o calor e as bebidas certas
            </h1>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Novembro em Maputo é assim: o calor volta devagar, as tardes esticam, e as conversas ganham tempo. 
              Este mês trouxemos de volta alguns favoritos e estreámos opções novas. Aqui está o que chegou e o que está a sair rápido.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-medium text-gray-900">Novos em stock</h2>
              </div>
              
              <div className="space-y-4">
                {newArrivals.map((product, i) => (
                  <div 
                    key={i}
                    className="border-l-2 border-gray-300 pl-4 cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => handleProductClick(product.name)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">{product.name} ({product.size})</h3>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">{product.brand}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {product.type === 'Gin' && 'Clássico inglês, limpo, com notas de zimbro. Funciona bem com tónica ou num G&T simples.'}
                      {product.type === 'Cerveja' && 'Leve, com toque cítrico. Perfeita para quem quer algo refrescante sem o peso de uma imperial completa.'}
                      {product.type === 'Whiskey' && 'Suave, com final de baunilha e carvalho. Para quem gosta de whiskey irlandês mas procura algo com mais corpo.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-medium text-gray-900">O que as pessoas estão a comprar</h2>
              </div>
              
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div 
                    key={i}
                    className="border-l-2 border-blue-300 pl-4 cursor-pointer hover:border-blue-600 transition-colors"
                    onClick={() => handleProductClick(product.name)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">{product.brand}</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{product.trend}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {i === 0 ? 'Continua a liderar. Não há surpresa aqui — é local, é fresca, e está em todo o lado.' : 
                       'Também está a sair bem. Português, acessível, e combina com quase tudo.'}
                    </p>
                  </div>
                ))}
                <div className="bg-white rounded p-3 text-sm text-gray-600 italic">
                  Observámos que muita gente compra às sextas para o fim de semana. Talvez seja o ritual de começar o descanso com algo familiar.
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-medium text-gray-900">Vale a pena experimentar</h2>
              </div>
              
              <div 
                className="border-l-2 border-amber-300 pl-4 cursor-pointer hover:border-amber-600 transition-colors"
                onClick={() => handleProductClick('Amarula Cream')}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900">Amarula Cream (750ml)</h3>
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">África do Sul</span>
                </div>
                <p className="text-sm text-gray-600">
                  Licor sul-africano feito com marula. Doce, cremoso, mas não enjoa. Funciona sozinho com gelo ou sobre gelado. 
                  É daquelas bebidas que surpreendem quem nunca provou.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 mb-4">
                Obrigado por continuarem a escolher a MBA. Se precisarem de algo específico ou tiverem dúvidas, 
                podem ligar para <span className="font-medium">+258 84 XXX XXXX</span> ou passar na nossa loja 
                (Av. Julius Nyerere, aberto de segunda a sábado, 9h–18h).
              </p>
              <p className="text-sm text-gray-600">Até a próxima edição.</p>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-600 mb-3">
                <strong>P.S.</strong> — Há alguma bebida que procuram e não encontram?
              </p>
              {!showFeedback ? (
                <button 
                  onClick={() => setShowFeedback(true)}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Dizer o que procuro
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
                      Enviar
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

        {/* APIBA Members Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-1">Membros da APIBA</h3>
            <p className="text-xs text-gray-600">Associação dos Produtores e Importadores de Bebidas Alcoólicas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apibaMembers.map((member, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
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
                      +{member.brands.length - 3} mais
                    </span>
                  )}
                </div>
              </div>
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
    const feedbacks = analytics.filter(e => e.category === 'feedback');

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-2">Dashboard de Inteligência</h2>
          <p className="text-gray-600">O que os utilizadores estão a fazer</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-3xl font-light text-gray-900 mb-1">{analytics.length}</div>
            <div className="text-sm text-gray-600">Total de eventos</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-3xl font-light text-gray-900 mb-1">{productClicks.length}</div>
            <div className="text-sm text-gray-600">Produtos clicados</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-3xl font-light text-gray-900 mb-1">{feedbacks.length}</div>
            <div className="text-sm text-gray-600">Pedidos recebidos</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Produtos Mais Clicados</h3>
          <div className="space-y-2">
            {productClicks.slice(-5).reverse().map((event, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                <span className="text-gray-700">{event.label}</span>
                <span className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleString('pt-PT')}</span>
              </div>
            ))}
            {productClicks.length === 0 && (
              <p className="text-sm text-gray-500 italic">Nenhum clique registado ainda</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Pedidos de Produtos</h3>
          <div className="space-y-2">
            {feedbacks.map((event, i) => (
              <div key={i} className="p-3 bg-blue-50 rounded text-sm">
                <div className="font-medium text-gray-900">{event.label}</div>
                <div className="text-xs text-gray-500 mt-1">{new Date(event.timestamp).toLocaleString('pt-PT')}</div>
              </div>
            ))}
            {feedbacks.length === 0 && (
              <p className="text-sm text-gray-500 italic">Nenhum pedido recebido ainda</p>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-gray-700">
            <strong>💡 Próximo passo:</strong> Conectar este dashboard a uma base de dados real (Supabase, Google Sheets, ou API própria) 
            para persistir dados entre sessões e gerar relatórios automáticos.
          </p>
        </div>
      </div>
    );
  };

  const SystemView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-light text-gray-900 mb-2">Sistema de Newsletter — Arquitectura</h2>
        <p className="text-gray-600">Como funciona o ecossistema MBA</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-3">Fluxo de Dados</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Vendas diárias → Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Cliques de utilizadores → Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Análise de tendências → Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Narrativa cultural → Newsletter</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Feedback clientes → Loop</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-3">Pontos de Contacto</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>Email mensal (subscribers)</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span>Website MBA (arquivo público)</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span>Portal B2B (para distribuidores)</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              <span>Dashboard Analytics (interno)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 p-8 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filosofia do Sistema</h3>
        <div className="space-y-4 text-sm text-gray-700">
          <p>
            <strong>Inteligência comercial como narrativa.</strong> Cada newsletter é um snapshot do mercado Moçambicano de bebidas — 
            o que está a entrar, o que está a sair, o que as pessoas procuram. Não é marketing. É observação.
          </p>
          <p>
            <strong>Dados → Insight → História.</strong> O sistema captura vendas em tempo real, identifica padrões (sextas-feiras, 
            eventos sazonais, preferências regionais) e transforma isso numa história mensal que faz sentido cultural.
          </p>
          <p>
            <strong>Feedback loop integrado.</strong> O P.S. não é decorativo — alimenta decisões de stock. 
            Se 50 pessoas pedem um produto, MBA traz. Se ninguém responde sobre gin premium, talvez não seja o momento.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Próximos Passos de Evolução</h3>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0">1</div>
            <div>
              <div className="font-medium text-gray-900">Conectar ao site MBA</div>
              <div className="text-gray-600">Scraping ou API de mba.co.mz/mba2n/ para puxar produtos automaticamente</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0">2</div>
            <div>
              <div className="font-medium text-gray-900">Base de dados persistente</div>
              <div className="text-gray-600">Supabase ou Google Sheets para armazenar analytics e feedbacks</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0">3</div>
            <div>
              <div className="font-medium text-gray-900">Geração automática de conteúdo</div>
              <div className="text-gray-600">Claude API para escrever secções baseadas em dados de vendas</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0">4</div>
            <div>
              <div className="font-medium text-gray-900">Personalização por utilizador</div>
              <div className="text-gray-600">Recomendações baseadas em cliques anteriores</div>
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
              <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                <span className="text-white text-lg font-bold">MB</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">MBA</h1>
                <p className="text-xs text-gray-500">Newsletter System</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
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
                Representando produtores e importadores de bebidas alcoólicas em Moçambique. 
                Membro da APIBA.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Contacto</h4>
              <p className="text-gray-600 text-xs">+258 84 XXX XXXX</p>
              <p className="text-gray-600 text-xs">Av. Julius Nyerere, Maputo</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tech Stack</h4>
              <p className="text-gray-600 text-xs">React + Vite + Tailwind</p>
              <p className="text-gray-600 text-xs">Deployed on Vercel</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
