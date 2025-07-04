'use client';

import React from 'react';
import { 
  Mic, 
  Volume2, 
  Globe, 
  Zap, 
  Shield, 
  Headphones 
} from 'lucide-react';

const services = [
  {
    icon: Mic,
    title: 'Locução Profissional',
    description: 'Vozes profissionais de alta qualidade para seus projetos comerciais, institucionais e educativos.',
    features: ['Múltiplos idiomas', 'Diferentes estilos', 'Qualidade premium'],
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    icon: Volume2,
    title: 'Produção de Áudio',
    description: 'Serviços completos de produção, edição e masterização de áudio profissional.',
    features: ['Estúdio profissional', 'Edição avançada', 'Masterização'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Globe,
    title: 'Tradução & Dublagem',
    description: 'Serviços especializados de tradução e dublagem para conteúdo internacional.',
    features: ['Tradução técnica', 'Dublagem sincronizada', 'Revisão linguística'],
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Zap,
    title: 'Delivery Rápido',
    description: 'Entrega ágil sem comprometer a qualidade. Projetos urgentes são nossa especialidade.',
    features: ['24-48h entrega', 'Suporte dedicado', 'Revisões incluídas'],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Shield,
    title: 'Qualidade Garantida',
    description: 'Garantimos excelência em cada projeto com revisões ilimitadas até sua satisfação.',
    features: ['Revisões ilimitadas', 'Garantia de qualidade', 'Suporte pós-entrega'],
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Headphones,
    title: 'Suporte Especializado',
    description: 'Equipe dedicada para orientar e acompanhar seu projeto do início ao fim.',
    features: ['Consultoria técnica', 'Acompanhamento 24/7', 'Suporte técnico'],
    gradient: 'from-indigo-500 to-violet-500'
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="hero-pattern absolute inset-0" />
        <div className="grid-pattern absolute inset-0 opacity-20" />
      </div>
      
      <div className="relative z-10 section-container">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 text-violet-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Nossos Serviços
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Soluções Completas</span>
            <br />
            em Áudio Profissional
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Oferecemos uma gama completa de serviços de áudio profissional, 
            desde locução até produção completa, com qualidade internacional 
            e entrega rápida.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Card */}
                <div className="glass-card p-8 h-full hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 hover:-translate-y-2">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.gradient} mb-6 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Hover effect gradient border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para começar seu projeto?
            </h3>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos transformar 
              suas ideias em áudio de qualidade profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-glow">
                Solicitar Orçamento
              </button>
              <button className="px-6 py-3 border-2 border-slate-600 text-slate-300 rounded-xl hover:border-violet-500 hover:text-violet-400 transition-all duration-300">
                Ver Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
