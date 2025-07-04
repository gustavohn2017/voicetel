'use client';

import React from 'react';
import { 
  Star, 
  Clock, 
  Shield, 
  Headphones, 
  Award, 
  CheckCircle,
  TrendingUp,
  Users
} from 'lucide-react';

const stats = [
  {
    icon: Star,
    value: '500+',
    label: 'Projetos Concluídos',
    description: 'Histórico comprovado de excelência'
  },
  {
    icon: Clock,
    value: '24h',
    label: 'Entrega Rápida',
    description: 'Agilidade sem comprometer qualidade'
  },
  {
    icon: Users,
    value: '98%',
    label: 'Satisfação',
    description: 'Clientes satisfeitos e fidelizados'
  },
  {
    icon: Award,
    value: '5+',
    label: 'Anos de Mercado',
    description: 'Experiência consolidada no setor'
  }
];

const benefits = [
  {
    icon: Shield,
    title: 'Qualidade Garantida',
    description: 'Garantimos a excelência em cada projeto com revisões ilimitadas até sua total satisfação.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10'
  },
  {
    icon: Clock,
    title: 'Entrega Rápida',
    description: 'Projetos entregues em 24-48h sem comprometer a qualidade profissional esperada.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: Headphones,
    title: 'Suporte Dedicado',
    description: 'Equipe especializada disponível 24/7 para orientar e acompanhar seu projeto.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  },
  {
    icon: TrendingUp,
    title: 'Resultados Comprovados',
    description: 'Histórico de sucesso com mais de 500 projetos entregues e clientes satisfeitos.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10'
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="hero-pattern absolute inset-0" />
        <div className="grid-pattern absolute inset-0 opacity-10" />
      </div>
      
      <div className="relative z-10 section-container">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Por que nos escolher
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Vantagens</span> que fazem
            <br />
            a diferença
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Combinamos experiência, tecnologia e dedicação para entregar 
            resultados excepcionais em cada projeto de áudio profissional.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <div key={index} className="text-center group">
                <div className="glass-card p-6 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500">
                  <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 mb-4 shadow-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  
                  <div className="text-violet-400 font-semibold mb-1">
                    {stat.label}
                  </div>
                  
                  <div className="text-sm text-slate-400">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            
            return (
              <div key={index} className="group">
                <div className="glass-card p-8 h-full hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 hover:-translate-y-2">
                  <div className={`inline-flex p-4 rounded-2xl ${benefit.bgColor} mb-6`}>
                    <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-400 transition-colors">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="glass-card p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Nosso Processo
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Um fluxo de trabalho otimizado para garantir resultados excepcionais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Briefing',
                description: 'Entendemos suas necessidades e objetivos'
              },
              {
                step: '02',
                title: 'Produção',
                description: 'Criamos o áudio com qualidade profissional'
              },
              {
                step: '03',
                title: 'Revisão',
                description: 'Ajustamos até sua total satisfação'
              },
              {
                step: '04',
                title: 'Entrega',
                description: 'Receba seu projeto finalizado rapidamente'
              }
            ].map((process, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {process.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent -translate-y-1/2" />
                  )}
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                  {process.title}
                </h4>
                
                <p className="text-slate-400 text-sm">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
