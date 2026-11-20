import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  MapPin,
  Tag,
  Hourglass,
  Scale,
  Building2,
  ShieldCheck,
  MessageSquare,
  UserCheck,
  ZoomIn,
  X,
  GraduationCap,
  LogOut,
  PlusCircle,
  Package,
  Info,
  Check,
  Send,
  AlertCircle,
  User
} from 'lucide-react';

import bottleMainImg from './assets/images/garrafa_termica_azul_1791438687780.jpg';
import bottleDetailImg from './assets/images/garrafa_termica_detalhe_1791438701168.jpg';

interface Item {
  id: string;
  registrationId: string;
  title: string;
  description: string;
  status: 'Encontrado' | 'Aguardando dono' | 'Devolvido';
  category: string;
  categoryTag: string;
  location: string;
  date: string;
  registeredBy: string;
  registeredByRole: string;
  pickupLocation: string;
  pickupRoom: string;
  pickupHours: string;
  images: string[];
  notes: string;
}

const CURRENT_ITEM: Item = {
  id: 'item-1',
  registrationId: '#IF-2026-0891',
  title: 'Garrafa térmica azul',
  description:
    'Garrafa de inox térmica azul escura com alça na tampa, capacidade de 750ml, encontrada em uma das mesas de estudo individual.',
  status: 'Encontrado',
  category: 'Outros',
  categoryTag: 'Utensílios / Outros',
  location: 'Biblioteca',
  date: '18/09/2026',
  registeredBy: 'Profª. Helena Souza',
  registeredByRole: 'Servidora / Bibliotecária',
  pickupLocation: 'Central de Achados e Perdidos',
  pickupRoom: 'Bloco Central, Sala 104',
  pickupHours: '08h às 19h',
  images: [bottleMainImg, bottleDetailImg],
  notes:
    'O objeto foi catalogado e encontra-se devidamente higienizado e armazenado em armário fechado na sala da coordenação.'
};

export default function App() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isClaimOpen, setIsClaimOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<'inicio' | 'meus-itens' | 'cadastrar'>('inicio');
  const [showToast, setShowToast] = useState<string | null>(null);

  // Claim Form state
  const [claimName, setClaimName] = useState('');
  const [claimMatricula, setClaimMatricula] = useState('');
  const [claimDetails, setClaimDetails] = useState('');
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  // Contact Form state
  const [contactSubject, setContactSubject] = useState('Dúvida sobre o item #IF-2026-0891');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 4000);
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClaimSubmitted(true);
    setTimeout(() => {
      setClaimSubmitted(false);
      setIsClaimOpen(false);
      triggerToast('Solicitação de reivindicação enviada com sucesso! Protocolo #REV-2026-4491 gerado.');
    }, 1500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setIsContactOpen(false);
      triggerToast('Mensagem enviada com sucesso para a Central e Profª Helena Souza.');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#edf5ef] text-gray-800 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#1c6433] text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-emerald-600/40 animate-fade-in text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span>{showToast}</span>
          <button
            onClick={() => setShowToast(null)}
            className="ml-2 text-emerald-200 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-[#1f6f3a] text-white shadow-xs sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveNav('inicio')}
              className="flex items-center gap-3 text-left focus:outline-hidden group"
            >
              {/* IF Institutional Logo Square */}
              <div className="w-9 h-9 rounded-lg bg-white/95 flex items-center justify-center p-1.5 shadow-xs transition-transform group-hover:scale-105">
                <div className="grid grid-cols-2 gap-1 w-full h-full">
                  <div className="bg-[#1f6f3a] rounded-xs"></div>
                  <div className="bg-[#e11d48] rounded-full"></div>
                  <div className="bg-[#1f6f3a] rounded-xs"></div>
                  <div className="bg-[#1f6f3a] rounded-xs"></div>
                </div>
              </div>
              <div>
                <h1 className="font-bold text-base sm:text-lg leading-tight tracking-tight text-white flex items-center gap-1.5">
                  Achados IF
                </h1>
                <p className="text-[11px] text-emerald-100 font-normal opacity-90 leading-none">
                  Rede Federal de Educação
                </p>
              </div>
            </button>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <button
                onClick={() => setActiveNav('inicio')}
                className={`relative py-1 font-medium transition-colors ${
                  activeNav === 'inicio'
                    ? 'text-white'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                Início
                {activeNav === 'inicio' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveNav('meus-itens');
                  triggerToast('Você não possui itens pendentes cadastrados nesta conta institucional.');
                }}
                className={`py-1 font-medium transition-colors ${
                  activeNav === 'meus-itens'
                    ? 'text-white font-semibold'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                Meus itens
              </button>

              <button
                onClick={() => {
                  setActiveNav('cadastrar');
                  triggerToast('Abrindo formulário de cadastro de novo item encontrado...');
                }}
                className={`flex items-center gap-1.5 py-1 font-medium transition-colors ${
                  activeNav === 'cadastrar'
                    ? 'text-white font-semibold'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-emerald-200" />
                Cadastrar item
              </button>
            </nav>
          </div>

          {/* User & Campus Pills */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#17592e] text-emerald-100 px-3.5 py-1.5 rounded-full text-xs font-medium border border-emerald-600/30">
              <GraduationCap className="w-4 h-4 text-emerald-200" />
              <span className="hidden sm:inline">Campus Central - Aluno</span>
              <span className="sm:hidden">Campus Central</span>
            </div>

            <button
              onClick={() => triggerToast('Sessão institucional do SUAP / Acadêmico conectada.')}
              className="flex items-center gap-1.5 text-xs font-medium text-emerald-100 hover:text-white px-2 py-1.5 rounded-lg hover:bg-emerald-700/50 transition-colors"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Navigation Action */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => triggerToast('Você já está na visualização de detalhes deste item.')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 hover:text-gray-900 text-sm font-medium rounded-xl border border-gray-200/90 shadow-2xs hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gray-500" />
            <span>Voltar para listagem</span>
          </button>

          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Sistema atualizado hoje</span>
          </div>
        </div>

        {/* Main 2-Column Detail View (Matches exact screen provided) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Photo & Custody Notes */}
          <div className="lg:col-span-6 flex flex-col gap-4">
              {/* Main Photo Card */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs">
                {/* Photo Container */}
                <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-gray-100 border border-gray-100 group">
                  <img
                    src={CURRENT_ITEM.images[selectedPhotoIndex]}
                    alt={CURRENT_ITEM.title}
                    className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-[1.01]"
                  />

                  {/* Official Record Badge (Top Left) */}
                  <div className="absolute top-3.5 left-3.5">
                    <div className="bg-white/95 backdrop-blur-xs text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs border border-gray-200/70">
                      <div className="w-4 h-4 rounded-full bg-[#1f6f3a] flex items-center justify-center text-white">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Registro Fotográfico Oficial</span>
                    </div>
                  </div>

                  {/* Zoom Button (Bottom Right) */}
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="absolute bottom-3.5 right-3.5 bg-white/95 hover:bg-white text-gray-700 p-2.5 rounded-full shadow-md border border-gray-200/80 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    title="Ampliar foto"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                {/* Thumbnails & ID bar below photo */}
                <div className="mt-4 flex items-center justify-between pt-1">
                  {/* Gallery Thumbnails */}
                  <div className="flex items-center gap-2.5">
                    {/* Thumbnail 1 */}
                    <button
                      onClick={() => setSelectedPhotoIndex(0)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden transition-all cursor-pointer ${
                        selectedPhotoIndex === 0
                          ? 'border-2 border-[#1f6f3a] ring-2 ring-emerald-500/20 p-0.5'
                          : 'border border-gray-200 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={CURRENT_ITEM.images[0]}
                        alt="Foto principal"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </button>

                    {/* Thumbnail 2 */}
                    <button
                      onClick={() => setSelectedPhotoIndex(1)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden transition-all flex items-center justify-center bg-gray-50 cursor-pointer ${
                        selectedPhotoIndex === 1
                          ? 'border-2 border-[#1f6f3a] ring-2 ring-emerald-500/20 p-0.5'
                          : 'border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={CURRENT_ITEM.images[1]}
                        alt="Foto detalhe"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </button>
                  </div>

                  {/* Custody ID Info */}
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-[11px] text-gray-500 font-medium">
                      <Package className="w-3.5 h-3.5 text-gray-400" />
                      <span>Custódia patrimonial</span>
                    </div>
                    <div className="text-xs font-bold text-gray-800 mt-0.5 tracking-tight font-mono">
                      ID Registro: {CURRENT_ITEM.registrationId}
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Inspection Notice Card */}
              <div className="bg-[#edf6ef] border border-[#cbe4d2] rounded-xl p-4 flex items-start gap-3.5 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-[#1f6f3a]">
                  <Info className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-snug">
                    Inspeção física realizada
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {CURRENT_ITEM.notes}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Details, Metadata, Custody, Actions */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-2xs flex flex-col gap-5">
                {/* Status Badges Row */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Status: Encontrado */}
                  <span className="inline-flex items-center gap-1.5 bg-[#def2e4] text-[#17592e] text-xs font-semibold px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-[#1f6f3a]"></span>
                    {CURRENT_ITEM.status}
                  </span>

                  {/* Category Pill */}
                  <span className="inline-flex items-center gap-1.5 bg-[#eef4f0] text-[#244b30] text-xs font-semibold px-3 py-1 rounded-full">
                    <Scale className="w-3.5 h-3.5" />
                    {CURRENT_ITEM.categoryTag}
                  </span>

                  {/* Waiting owner pill */}
                  <span className="inline-flex items-center gap-1.5 bg-[#fef3c7] text-[#92400e] text-xs font-semibold px-3 py-1 rounded-full">
                    <Hourglass className="w-3.5 h-3.5" />
                    Aguardando dono
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {CURRENT_ITEM.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {CURRENT_ITEM.description}
                  </p>
                </div>

                {/* 2x2 Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Category */}
                  <div className="bg-[#f7faf8] border border-gray-200/80 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1f6f3a] flex items-center justify-center shrink-0">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 font-medium">Categoria</div>
                      <div className="text-sm font-bold text-gray-900 mt-0.5">
                        {CURRENT_ITEM.category}
                      </div>
                    </div>
                  </div>

                  {/* Location Found */}
                  <div className="bg-[#f7faf8] border border-gray-200/80 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1f6f3a] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 font-medium">Local do encontro</div>
                      <div className="text-sm font-bold text-gray-900 mt-0.5">
                        {CURRENT_ITEM.location}
                      </div>
                    </div>
                  </div>

                  {/* Date Found */}
                  <div className="bg-[#f7faf8] border border-gray-200/80 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1f6f3a] flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 font-medium">Data do encontro</div>
                      <div className="text-sm font-bold text-gray-900 mt-0.5">
                        {CURRENT_ITEM.date}
                      </div>
                    </div>
                  </div>

                  {/* Registered By */}
                  <div className="bg-[#f7faf8] border border-gray-200/80 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1f6f3a] flex items-center justify-center shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 font-medium">Cadastrado por</div>
                      <div className="text-sm font-bold text-gray-900 mt-0.5">
                        {CURRENT_ITEM.registeredBy}
                      </div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        {CURRENT_ITEM.registeredByRole}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custody Location Card */}
                <div className="bg-[#edf6ef] border border-[#cbe4d2] rounded-xl p-4 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/90 text-[#1f6f3a] flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-600 font-medium">
                      Local de retirada / custódia física
                    </div>
                    <div className="text-sm font-bold text-[#17592e] mt-0.5">
                      {CURRENT_ITEM.pickupLocation}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5 font-normal">
                      {CURRENT_ITEM.pickupRoom} • Horário de atendimento: {CURRENT_ITEM.pickupHours}
                    </div>
                  </div>
                </div>

                {/* Primary & Secondary Action CTA Buttons */}
                <div className="flex flex-col gap-2.5 pt-1">
                  {/* Primary: Entrar em contato */}
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="w-full bg-[#1f6f3a] hover:bg-[#18592f] text-white font-semibold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow-sm transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Entrar em contato</span>
                  </button>

                  {/* Secondary: Reivindicar posse deste item */}
                  <button
                    onClick={() => setIsClaimOpen(true)}
                    className="w-full bg-white hover:bg-gray-50 border border-gray-300/90 text-gray-800 font-semibold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <User className="w-4 h-4 text-gray-600" />
                    <span>Reivindicar posse deste item</span>
                  </button>
                </div>

                {/* Withdrawal Instruction Callout */}
                <div className="bg-[#edf6ef] border-l-4 border-[#1f6f3a] rounded-r-xl p-4 flex items-start gap-3 mt-1">
                  <ShieldCheck className="w-4 h-4 text-[#1f6f3a] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">
                      Instrução para retirada:
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Para retirar o item, apresente documento com foto e comprove posse (ou características específicas) na Sala 104.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#edf5ef] border-t border-emerald-900/10 py-7 px-4 sm:px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-5 text-xs text-gray-600">
          {/* Institutional Info */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-emerald-800/10 text-[#1f6f3a] flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-xs">
                Instituto Federal de Educação, Ciência e Tecnologia
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">
                © 2026 Instituto Federal - Sistema Institucional de Achados e Perdidos. Todos os direitos reservados.
              </p>
            </div>
          </div>

          {/* Institutional Navigation Links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-600">
            <button
              onClick={() => triggerToast('Visualizando Termos de Uso do Sistema IF')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
            <button
              onClick={() => triggerToast('Política de Privacidade e LGPD da Rede Federal')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Privacidade
            </button>
            <button
              onClick={() => triggerToast('Guia de Retirada: Sala 104 - Bloco Central')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Guia de Retirada
            </button>
            <a
              href="mailto:reitoria@ifba.edu.br"
              onClick={() => triggerToast('Contato da Reitoria: reitoria@ifba.edu.br')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Contato da Reitoria
            </a>
          </div>
        </div>
      </footer>

      {/* MODAL 1: Image Lightbox / Zoom */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-gray-800">
                  {CURRENT_ITEM.title}
                </span>
                <span className="text-xs text-gray-500">({CURRENT_ITEM.registrationId})</span>
              </div>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-gray-900 flex items-center justify-center min-h-[400px]">
              <img
                src={CURRENT_ITEM.images[selectedPhotoIndex]}
                alt="Ampliada"
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="px-5 py-3.5 flex items-center justify-between bg-white text-xs text-gray-600">
              <div className="flex items-center gap-2">
                {CURRENT_ITEM.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhotoIndex(i)}
                    className={`w-10 h-10 rounded-md overflow-hidden border-2 transition-all ${
                      selectedPhotoIndex === i
                        ? 'border-[#1f6f3a] ring-2 ring-emerald-400'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Entrar em Contato */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in border border-gray-100">
            <div className="bg-[#1f6f3a] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Entrar em contato</h3>
                <p className="text-xs text-emerald-100">
                  Fale com {CURRENT_ITEM.registeredBy} ({CURRENT_ITEM.location})
                </p>
              </div>
              <button
                onClick={() => setIsContactOpen(false)}
                className="text-emerald-100 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Assunto</label>
                <input
                  type="text"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Sua mensagem ou dúvida
                </label>
                <textarea
                  rows={4}
                  placeholder="Olá Professora Helena, gostaria de saber se a garrafa ainda se encontra na Sala 104..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden resize-none"
                ></textarea>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-[11px] text-emerald-800 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 text-emerald-700 mt-0.5" />
                <span>
                  A resposta será encaminhada diretamente para o seu e-mail institucional cadastrado no SUAP.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsContactOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={contactSubmitted}
                  className="px-5 py-2 bg-[#1f6f3a] hover:bg-[#18592f] text-white rounded-lg font-semibold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {contactSubmitted ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Reivindicar Posse do Item */}
      {isClaimOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in border border-gray-100">
            <div className="bg-[#1f6f3a] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Reivindicar Posse do Objeto</h3>
                <p className="text-xs text-emerald-100">
                  Item {CURRENT_ITEM.registrationId} - {CURRENT_ITEM.title}
                </p>
              </div>
              <button
                onClick={() => setIsClaimOpen(false)}
                className="text-emerald-100 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleClaimSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Eduardo Silva"
                    value={claimName}
                    onChange={(e) => setClaimName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Matrícula ou CPF
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="202410123049"
                    value={claimMatricula}
                    onChange={(e) => setClaimMatricula(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Descreva detalhes específicos que comprovem sua posse
                </label>
                <p className="text-[11px] text-gray-500 mb-1.5">
                  Ex: Marcas de uso, adesivos, conteúdo interno, arranhões na base ou data aproximada que esqueceu.
                </p>
                <textarea
                  rows={3}
                  required
                  placeholder="A garrafa possui um pequeno arranhão circular no fundo e esqueci por volta das 16h após a aula de cálculo..."
                  value={claimDetails}
                  onChange={(e) => setClaimDetails(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden resize-none"
                ></textarea>
              </div>

              {/* Requirement reminder */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Importante:</span> Para a liberação física do item na Central (Sala 104), será solicitada a apresentação de documento oficial com foto e assinatura do termo de devolução.
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsClaimOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={claimSubmitted}
                  className="px-5 py-2 bg-[#1f6f3a] hover:bg-[#18592f] text-white rounded-lg font-semibold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {claimSubmitted ? (
                    'Processando Solicitação...'
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Confirmar Reivindicação
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
