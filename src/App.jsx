import React, { useState } from 'react';
import { Wine, Beer, Martini, Flame, TrendingUp, Star, Mail, Menu, X } from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Featured products from APIBA partners
  const featuredProducts = [
    {
      name: 'Gin Tanqueray London Dry',
      brand: 'Diageo',
      size: '750ml',
      description: 'Clássico inglês, limpo, com notas de zimbro. Perfeito para um G&T refrescante.',
      category: 'Gin',
      color: 'from-green-50 to-emerald-50',
      icon: Martini
    },
    {
      name: 'Whiskey Jameson Black Barrel',
      brand: 'Pernod Ricard',
      size: '700ml',
      description: 'Suave e complexo, com final de baunilha e carvalho. Para os momentos especiais.',
      category: 'Whiskey',
      color: 'from-amber-50 to-orange-50',
      icon: Flame
    }
  ];

  const topSelling = [
    {
      name: 'Cerveja 2M',
      brand: 'CDM',
      size: '330ml',
      description: 'A cerveja de Moçambique. Fresca, local, e sempre presente.',
      trend: '+12%',
      icon: Beer
    },
    {
      name: 'Cerveja Heineken',
      brand: 'Heineken',
      size: '330ml',
      description: 'Qualidade premium internacional. Reconhecida mundialmente.',
      trend: '+8%',
      icon: Beer
    },
    {
      name: 'Vinho Duas Quintas',
      brand: 'Sogrape',
      size: '750ml',
      description: 'Tinto português, versátil e acessível. Ideal para qualquer ocasião.',
      trend: '+15%',
      icon: Wine
    }
  ];

  const newArrivals = [
    { name: 'Sagres Radler', brand: 'Heineken', size: '330ml', description: 'Cerveja com toque cítrico, leve e refrescante' },
    { name: 'Absolut Vodka', brand: 'Pernod Ricard', size: '750ml', description: 'Vodka sueca premium, pura e versátil' },
    { name: 'Johnnie Walker Red', brand: 'Diageo', size: '700ml', description: 'Blend clássico escocês, rico e equilibrado' },
    { name: 'Laurentina', brand: 'CDM', size: '330ml', description: 'Cerveja clara Moçambicana, fresca e suave' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-md">
                <span className="text-gray-900 text-2xl font-bold">MBA</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Beverage Magazine</h1>
                <p className="text-xs text-gray-400">Novembro 2025 · APIBA Partners</p>
              </div>
            </div>
            
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden md:flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4" />
              <span>Newsletter Mensal</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Novembro chegou — e com ele, o calor e as bebidas certas
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed">
              Novembro em Maputo é assim: o calor volta devagar, as tardes esticam, e as conversas ganham tempo. 
              Descubra as novidades dos nossos parceiros.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Featured Products */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-8 h-8 text-amber-500" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Em Destaque</h2>
              <p className="text-sm text-gray-600">Produtos selecionados este mês</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredProducts.map((product, i) => {
              const Icon = product.icon;
              return (
                <div key={i} className={`bg-gradient-to-br ${product.color} rounded-2xl p-8 border-2 border-white shadow-lg hover:shadow-xl transition-all`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <Icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <span className="text-xs font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-gray-700">
                      {product.brand}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{product.size} · {product.category}</p>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Top Selling */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Mais Vendidos</h2>
              <p className="text-sm text-gray-600">O que está a sair rápido</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topSelling.map((product, i) => {
              const Icon = product.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
                      {product.trend}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{product.size} · {product.brand}</p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* New Arrivals */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NEW</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Novos em Stock</h2>
              <p className="text-sm text-gray-600">Acabaram de chegar</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {newArrivals.map((product, i) => (
              <div key={i} className="bg-white rounded-lg p-5 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded shrink-0 ml-2">
                    {product.brand}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{product.size}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl font-bold mb-6">Parceiros APIBA</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { name: 'CDM', brands: '2M, Laurentina, Manica' },
              { name: 'Heineken', brands: 'Heineken, Amstel, Sagres' },
              { name: 'Pernod Ricard', brands: 'Jameson, Absolut, Chivas' },
              { name: 'Diageo', brands: 'Johnnie Walker, Smirnoff, Tanqueray' },
              { name: 'Socimpex', brands: 'Marcas importadas' },
            ].map((partner, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="font-bold text-lg mb-2">{partner.name}</div>
                <div className="text-xs text-gray-300">{partner.brands}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Observação */}
        <section className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Observação do Mercado</h3>
              <p className="text-gray-700">
                Notámos que as sextas-feiras mostram picos consistentes de compra. Possível ritual de início de fim de semana. 
                Cervejas locais e vinhos portugueses lideram as preferências.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 text-lg font-bold">MBA</span>
                </div>
                <div>
                  <div className="font-bold">Beverage Magazine</div>
                  <div className="text-xs text-gray-400">by MBA</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Newsletter mensal de bebidas para o mercado Moçambicano
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Contacto</h4>
              <p className="text-sm text-gray-400">+258 84 XXX XXXX</p>
              <p className="text-sm text-gray-400">Av. Julius Nyerere, Maputo</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Parceiros</h4>
              <p className="text-sm text-gray-400">CDM · Heineken · Pernod Ricard</p>
              <p className="text-sm text-gray-400">Diageo · Socimpex</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            © 2025 MBA · Membros da APIBA
          </div>
        </div>
      </footer>
    </div>
  );
}
