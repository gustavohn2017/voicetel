'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Download, 
  Star, 
  Music, 
  Mic, 
  Phone, 
  Video,
  Headphones
} from 'lucide-react';

const categories = [
  { id: 'todos', label: 'Todos', icon: Headphones },
  { id: 'ura', label: 'URA', icon: Phone },
  { id: 'videos', label: 'Vídeos', icon: Video },
  { id: 'comercial', label: 'Comercial', icon: Star },
  { id: 'podcast', label: 'Podcast', icon: Mic }
];

const audioSamples = [
  {
    id: 1,
    title: 'URA Receptiva Profissional',
    category: 'ura',
    duration: '0:45',
    voice: 'Feminina',
    style: 'Profissional',
    rating: 4.9,
    color: 'from-blue-500 to-cyan-500',
    description: 'Mensagem acolhedora para atendimento telefônico'
  },
  {
    id: 2,
    title: 'Comercial Institucional',
    category: 'comercial',
    duration: '1:20',
    voice: 'Masculina',
    style: 'Confiante',
    rating: 4.8,
    color: 'from-emerald-500 to-teal-500',
    description: 'Locução persuasiva para campanha publicitária'
  },
  {
    id: 3,
    title: 'Narração de Vídeo Corporativo',
    category: 'videos',
    duration: '2:15',
    voice: 'Feminina',
    style: 'Amigável',
    rating: 5.0,
    color: 'from-purple-500 to-pink-500',
    description: 'Narração envolvente para apresentação empresarial'
  },
  {
    id: 4,
    title: 'Intro Podcast Tecnologia',
    category: 'podcast',
    duration: '0:30',
    voice: 'Masculina',
    style: 'Dinâmico',
    rating: 4.7,
    color: 'from-orange-500 to-red-500',
    description: 'Abertura energética para podcast de inovação'
  },
  {
    id: 5,
    title: 'URA Ativa - Pesquisa',
    category: 'ura',
    duration: '1:05',
    voice: 'Feminina',
    style: 'Cordial',
    rating: 4.6,
    color: 'from-indigo-500 to-violet-500',
    description: 'Abordagem amigável para pesquisa de satisfação'
  },
  {
    id: 6,
    title: 'Spot Publicitário',
    category: 'comercial',
    duration: '0:30',
    voice: 'Masculina',
    style: 'Persuasivo',
    rating: 4.9,
    color: 'from-pink-500 to-rose-500',
    description: 'Spot impactante para campanha promocional'
  }
];

export default function AudioSamplesSection() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);

  const filteredSamples = selectedCategory === 'todos' 
    ? audioSamples 
    : audioSamples.filter(sample => sample.category === selectedCategory);

  const handlePlay = (id: number) => {
    if (currentPlaying === id) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(id);
    }
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="hero-pattern absolute inset-0" />
        <div className="grid-pattern absolute inset-0 opacity-20" />
      </div>
      
      <div className="relative z-10 section-container">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 text-violet-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Music className="w-4 h-4" />
            Portfolio de Áudio
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Amostras</span> do nosso
            <br />
            trabalho profissional
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Ouça exemplos reais dos nossos projetos e descubra a qualidade 
            que podemos entregar para o seu negócio.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white border border-slate-700'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Audio Samples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSamples.map((sample) => (
            <div key={sample.id} className="group">
              <div className="glass-card p-6 h-full hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 hover:-translate-y-2">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${sample.color} shadow-lg`}>
                    <Volume2 className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{sample.rating}</span>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                  {sample.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {sample.description}
                </p>
                
                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <span className="text-slate-500">Duração:</span>
                    <div className="text-slate-300 font-medium">{sample.duration}</div>
                  </div>
                  
                  <div>
                    <span className="text-slate-500">Voz:</span>
                    <div className="text-slate-300 font-medium">{sample.voice}</div>
                  </div>
                  
                  <div>
                    <span className="text-slate-500">Estilo:</span>
                    <div className="text-slate-300 font-medium">{sample.style}</div>
                  </div>
                  
                  <div>
                    <span className="text-slate-500">Categoria:</span>
                    <div className="text-slate-300 font-medium capitalize">{sample.category}</div>
                  </div>
                </div>
                
                {/* Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlay(sample.id)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      currentPlaying === sample.id
                        ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {currentPlaying === sample.id ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {currentPlaying === sample.id ? 'Pausar' : 'Ouvir'}
                  </button>
                  
                  <button className="p-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 hover:text-white transition-all duration-300 border border-slate-700">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Impressionado com a qualidade?
            </h3>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Estas são apenas algumas amostras do nosso trabalho. 
              Vamos criar algo incrível para o seu projeto também.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-glow">
                Solicitar Orçamento
              </button>
              <button className="px-6 py-3 border-2 border-slate-600 text-slate-300 rounded-xl hover:border-violet-500 hover:text-violet-400 transition-all duration-300">
                Ver Mais Amostras
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
