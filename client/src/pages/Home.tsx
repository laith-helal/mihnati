import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CirclePlay,
  Clock3,
  Hammer,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  PenTool,
  Play,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const categories = [
  { label: "كهربائي", count: "124 مهني", icon: Zap, tone: "bg-[#fff2e8] text-[#dd6a19]" },
  { label: "نجار", count: "89 مهني", icon: Hammer, tone: "bg-[#e9f0fb] text-[#254d88]" },
  { label: "سباك", count: "76 مهني", icon: Wrench, tone: "bg-[#edf6f3] text-[#1d7a67]" },
  { label: "ميكانيكي", count: "63 مهني", icon: PenTool, tone: "bg-[#f2edfb] text-[#7652a7]" },
  { label: "دهان وديكور", count: "51 مهني", icon: Sparkles, tone: "bg-[#fff4d9] text-[#a56b00]" },
  { label: "خياط", count: "42 مهني", icon: BriefcaseBusiness, tone: "bg-[#fbecef] text-[#b44f6b]" },
];

const professionals = [
  { name: "محمد أبو خليل", trade: "كهربائي منازل", location: "عمّان، الجبيهة", rating: "4.9", reviews: 38, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=85", verified: true, tag: "متاح الآن" },
  { name: "يزن الحداد", trade: "نجار أثاث وديكور", location: "عمّان، خلدا", rating: "5.0", reviews: 24, image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=900&q=85", verified: true, tag: "الأعلى تقييماً" },
  { name: "رامي الزعبي", trade: "ميكانيكي سيارات", location: "الزرقاء الجديدة", rating: "4.8", reviews: 57, image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=900&q=85", verified: true, tag: "يرد بسرعة" },
];

const listings = [
  { title: "عدة كهربائي كاملة — شبه جديدة", meta: "عمّان · منذ ساعتين", price: "180", image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=850&q=85", badge: "حالة ممتازة" },
  { title: "منشار طاولة احترافي Bosch", meta: "إربد · منذ 5 ساعات", price: "320", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=850&q=85", badge: "موثّق" },
  { title: "ماكينة خياطة صناعية Juki", meta: "عمّان · أمس", price: "250", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=850&q=85", badge: "فرصة" },
];

const videoWork = [
  { name: "تركيب لوحة كهرباء", creator: "محمد أبو خليل", time: "0:15", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=85" },
  { name: "طاولة قهوة من الصفر", creator: "يزن الحداد", time: "0:15", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=700&q=85" },
  { name: "فحص محرك قبل الشراء", creator: "رامي الزعبي", time: "0:15", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=700&q=85" },
  { name: "تفصيل بدلة رسمية", creator: "لينا عودة", time: "0:15", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=85" },
];

function SectionHeading({ eyebrow, title, link }: { eyebrow: string; title: string; link?: string }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[.16em] text-[#dc6b1b]"><span className="h-1.5 w-1.5 rounded-full bg-[#dc6b1b]" />{eyebrow}</div>
        <h2 className="display-font text-2xl font-extrabold tracking-tight text-[#102d5e] sm:text-3xl">{title}</h2>
      </div>
      {link && <button onClick={() => toast.info("سنفتح لك المزيد قريباً")} className="group hidden items-center gap-2 pb-1 text-sm font-bold text-[#254d88] sm:flex">{link}<ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /></button>}
    </div>
  );
}

export default function Home() {
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");
  const [trade, setTrade] = useState("كل المهن");
  const [city, setCity] = useState("عمّان");
  const [liked, setLiked] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filteredPros = useMemo(() => {
    const normalized = query.trim();
    if (!normalized) return professionals;
    return professionals.filter((p) => `${p.name} ${p.trade} ${p.location}`.includes(normalized));
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(query ? `نبحث لك عن ${query} في ${city}` : `اخترنا لك مهنيين موثوقين في ${city}`);
    document.getElementById("professionals")?.scrollIntoView({ behavior: "smooth" });
  };

  const actionToast = (message: string) => toast(message, { description: "هذه النسخة التجريبية ستتحول إلى خدمة فعلية عند الإطلاق." });

  return (
    <div dir="rtl" className="min-h-screen overflow-hidden bg-[#fbfaf7] text-[#102d5e]">
      <header className="relative z-50 border-b border-[#102d5e]/10 bg-[#fbfaf7]/90 backdrop-blur-xl">
        <div className="container flex h-[76px] items-center justify-between gap-5">
          <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="مهنتي - الرئيسية">
            <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#102d5e] text-white shadow-lg shadow-[#102d5e]/20"><Wrench size={21} strokeWidth={2.8} /></span>
            <span className="display-font text-[22px] font-extrabold tracking-tight text-[#102d5e]">مهنتي<span className="text-[#dc6b1b]">.</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-[14px] font-semibold text-[#304b71] lg:flex">
            <a className="text-[#102d5e]" href="#top">الرئيسية</a>
            <a className="transition-colors hover:text-[#dc6b1b]" href="#professionals">اعثر على مهني</a>
            <a className="transition-colors hover:text-[#dc6b1b]" href="#work">معرض الأعمال</a>
            <a className="transition-colors hover:text-[#dc6b1b]" href="#market">سوق الأدوات</a>
            <a className="transition-colors hover:text-[#dc6b1b]" href="#jobs">الوظائف</a>
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <button onClick={() => actionToast("أهلاً بك في مجتمع مهنتي")} className="rounded-xl px-3 py-2 text-sm font-bold text-[#254d88] transition hover:bg-[#edf2fa]">تسجيل الدخول</button>
            <button onClick={() => actionToast("نموذج التسجيل سيجهز ملفك خلال دقائق")} className="rounded-xl bg-[#dc6b1b] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#dc6b1b]/20 hover:bg-[#c75d12]">سجّل كمهني <ArrowLeft className="mr-1 inline" size={15} /></button>
          </div>
          <button onClick={() => setMobileNav((v) => !v)} className="rounded-xl p-2 text-[#102d5e] sm:hidden" aria-label="فتح القائمة">{mobileNav ? <X /> : <Menu />}</button>
        </div>
        {mobileNav && <div className="border-t border-[#102d5e]/10 bg-white px-4 py-4 sm:hidden"><div className="container flex flex-col gap-4 text-sm font-bold"><a href="#professionals" onClick={() => setMobileNav(false)}>اعثر على مهني</a><a href="#work" onClick={() => setMobileNav(false)}>معرض الأعمال</a><a href="#market" onClick={() => setMobileNav(false)}>سوق الأدوات</a><button onClick={() => actionToast("نموذج التسجيل سيجهز ملفك خلال دقائق")} className="rounded-xl bg-[#dc6b1b] px-4 py-3 text-white">سجّل كمهني</button></div></div>}
      </header>

      <main id="top">
        <section className="noise hero-grid relative border-b border-[#102d5e]/10 bg-[#f4f7fb]">
          <div className="container relative grid min-h-[575px] items-center gap-10 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-20">
            <div className="relative z-10 max-w-[620px] text-right">
              <div className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#dc6b1b]/20 bg-white/75 px-3.5 py-2 text-xs font-bold text-[#dc6b1b] shadow-sm"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#fff0e5]"><Sparkles size={12} /></span> المنصة الأولى للمهنيين في الأردن</div>
              <h1 className="display-font fade-up fade-up-delay-1 max-w-[620px] text-[42px] font-extrabold leading-[1.22] tracking-[-.04em] text-[#102d5e] sm:text-6xl">شغلك يستاهل<br /><span className="relative inline-block text-[#dc6b1b]">الثقة.</span> ونحن نوصلها.</h1>
              <p className="fade-up fade-up-delay-2 mt-6 max-w-[530px] text-lg leading-8 text-[#48617f]">منصة تجمعك بأفضل المهنيين الموثوقين حولك — أو تساعدك تعرض مهارتك وتوصل لعميلك القادم.</p>
              <form onSubmit={handleSearch} className="fade-up fade-up-delay-3 mt-9 rounded-[22px] border border-[#102d5e]/10 bg-white p-2 shadow-[0_20px_60px_rgba(16,45,94,.14)] sm:max-w-[600px]">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-[#f7f8fa] px-4 py-3.5"><Search className="shrink-0 text-[#dc6b1b]" size={20} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ماذا تحتاج؟ (كهربائي، نجار...)" className="min-w-0 w-full bg-transparent text-sm font-semibold text-[#102d5e] outline-none placeholder:text-[#8290a4]" /></div>
                  <div className="flex items-center gap-2 rounded-2xl bg-[#f7f8fa] px-4 py-3.5 sm:w-[152px]"><MapPin className="shrink-0 text-[#dc6b1b]" size={18} /><select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent text-sm font-semibold text-[#304b71] outline-none"><option>عمّان</option><option>إربد</option><option>الزرقاء</option><option>العقبة</option></select></div>
                  <button type="submit" className="rounded-2xl bg-[#dc6b1b] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#dc6b1b]/20 hover:bg-[#c75d12]">ابحث الآن</button>
                </div>
              </form>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#647691]"><span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#1b947c]" /> مهنيون موثّقون</span><span className="flex items-center gap-1.5"><Star size={15} className="fill-[#e99a29] text-[#e99a29]" /> تقييمات حقيقية</span><span className="flex items-center gap-1.5"><Clock3 size={15} className="text-[#254d88]" /> رد خلال ساعة</span></div>
            </div>
            <div className="relative hidden h-[470px] lg:block">
              <div className="absolute right-[5%] top-2 h-[410px] w-[82%] overflow-hidden rounded-[34px] border-[10px] border-white bg-[#dce8f4] shadow-[0_30px_70px_rgba(16,45,94,.18)]"><img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1100&q=90" alt="مهني يعمل في ورشة" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#102d5e]/50 via-transparent to-transparent" /><div className="absolute bottom-6 right-6 left-6 flex items-end justify-between text-white"><div><div className="mb-1 text-xs font-bold text-white/80">مهارات حقيقية. فرص حقيقية.</div><div className="display-font text-2xl font-extrabold">خلّي شغلك يحكي عنك</div></div><div className="grid h-11 w-11 place-items-center rounded-full bg-[#dc6b1b] shadow-xl"><Play size={18} fill="currentColor" /></div></div></div>
              <div className="glass float absolute -bottom-2 -right-1 flex items-center gap-3 rounded-2xl px-4 py-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#eaf7f3] text-[#1c8a73]"><BadgeCheck size={21} /></div><div><div className="text-xs font-bold text-[#61718a]">ملفات موثقة</div><div className="display-font text-lg font-extrabold text-[#102d5e]">+2,500 مهني</div></div></div>
              <div className="glass absolute -left-1 top-14 flex items-center gap-3 rounded-2xl px-4 py-3"><div className="flex -space-x-2 space-x-reverse"><img className="h-8 w-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="" /><img className="h-8 w-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80" alt="" /><img className="h-8 w-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="" /></div><div className="text-xs font-bold text-[#102d5e]">اختيار الناس<br /><span className="font-normal text-[#72829b]">كل يوم</span></div></div>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 hidden h-16 w-16 -translate-x-1/2 rounded-full border-8 border-[#f4f7fb] bg-[#dc6b1b] text-white shadow-lg lg:grid lg:place-items-center"><ArrowDownIcon /></div>
        </section>

        <section className="container py-20 sm:py-24" id="categories">
          <SectionHeading eyebrow="تخصصك في مكان واحد" title="دور على المهارة، مش بس الاسم" link="شوف كل المهن" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ label, count, icon: Icon, tone }, index) => <button key={label} onClick={() => { setActiveCategory(label); setQuery(label); toast.success(`تم اختيار تخصص ${label}`); }} className={`lift group rounded-2xl border p-4 text-right ${activeCategory === label ? "border-[#dc6b1b] bg-white shadow-md" : "border-[#102d5e]/8 bg-white/60"}`}><div className={`mb-6 grid h-11 w-11 place-items-center rounded-xl ${tone}`}><Icon size={21} /></div><div className="mb-1 text-sm font-extrabold text-[#102d5e]">{label}</div><div className="text-xs font-medium text-[#8190a5]">{count}</div></button>)}
          </div>
        </section>

        <section id="professionals" className="bg-[#f0f4f8] py-20 sm:py-24">
          <div className="container"><SectionHeading eyebrow="موصى بهم لك" title="مهنيون تثق في شغلهم" link="عرض الجميع" />
            <div className="grid gap-5 lg:grid-cols-3">
              {filteredPros.map((pro, index) => <article key={pro.name} className="lift overflow-hidden rounded-[22px] border border-[#102d5e]/8 bg-white shadow-[0_8px_26px_rgba(16,45,94,.05)]"><div className="relative h-56 overflow-hidden"><img src={pro.image} alt={pro.trade} className="h-full w-full object-cover transition duration-500 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#102d5e]/55 to-transparent" /><span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-[#1b8c74] shadow-sm"><span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-[#1b8c74]" />{pro.tag}</span><button onClick={() => setLiked((old) => old.includes(index) ? old.filter((i) => i !== index) : [...old, index])} className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#8090a5] shadow-sm hover:text-[#d65959]" aria-label="إضافة للمفضلة"><Heart size={17} className={liked.includes(index) ? "fill-[#d65959] text-[#d65959]" : ""} /></button><div className="absolute bottom-4 right-4 text-white"><div className="flex items-center gap-1.5 text-xs font-semibold"><MapPin size={13} /> {pro.location}</div></div></div><div className="p-5"><div className="mb-3 flex items-start justify-between gap-2"><div><h3 className="display-font text-lg font-extrabold text-[#102d5e]">{pro.name} <BadgeCheck className="mr-1 inline text-[#258cb7]" size={16} fill="currentColor" color="white" /></h3><p className="mt-1 text-sm font-medium text-[#71829c]">{pro.trade}</p></div><div className="flex items-center gap-1 rounded-lg bg-[#fff5dc] px-2 py-1 text-xs font-extrabold text-[#a56b00]"><Star size={13} fill="currentColor" /> {pro.rating}</div></div><div className="flex items-center justify-between border-t border-[#102d5e]/8 pt-4 text-xs font-semibold text-[#8492a5]"><span>{pro.reviews} تقييماً موثوقاً</span><button onClick={() => actionToast(`فتح ملف ${pro.name}`)} className="flex items-center gap-1 font-bold text-[#254d88]">عرض الملف <ArrowLeft size={14} /></button></div></div></article>)}
            </div>
            {filteredPros.length === 0 && <div className="rounded-2xl bg-white p-10 text-center font-bold text-[#6a7b94]">ما لقينا نتائج مطابقة، جرّب كلمة ثانية.</div>}
          </div>
        </section>

        <section id="work" className="container py-20 sm:py-24"><SectionHeading eyebrow="شغل على أرض الواقع" title="شوف المهارة قبل ما تختار" link="استكشف معرض الأعمال" /><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{videoWork.map((video) => <button key={video.name} onClick={() => actionToast(`تشغيل فيديو ${video.name}`)} className="group relative aspect-[.78] overflow-hidden rounded-[20px] text-right"><img src={video.image} alt={video.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#102d5e]/90 via-[#102d5e]/15 to-transparent" /><div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#dc6b1b] shadow-lg"><CirclePlay size={20} fill="currentColor" /></div><div className="absolute inset-x-4 bottom-4 text-white"><div className="mb-1 text-[11px] font-semibold text-white/75">{video.creator} · {video.time}</div><div className="display-font text-sm font-extrabold leading-6">{video.name}</div></div></button>)}</div></section>

        <section className="noise overflow-hidden bg-[#102d5e] py-20 text-white sm:py-24"><div className="container relative grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]"><div><div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[.16em] text-[#f1a262]">للمهنيين الطموحين <span className="h-1.5 w-1.5 rounded-full bg-[#f1a262]" /></div><h2 className="display-font text-3xl font-extrabold leading-[1.35] sm:text-4xl">خلّي العالم يشوف<br /><span className="text-[#f1a262]">شو بتعرف تعمل.</span></h2><p className="mt-5 max-w-[490px] leading-8 text-[#c2cee0]">أنشئ بطاقتك المهنية، ارفع فيديو 15 ثانية من شغلك، وخلي العملاء الأقرب إليك يلاقوك.</p><div className="mt-8 flex flex-wrap gap-3"><button onClick={() => actionToast("نبدأ ببناء بطاقتك المهنية الآن")} className="rounded-xl bg-[#dc6b1b] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/15 hover:bg-[#ec7a28]">أنشئ ملفك مجاناً <ArrowLeft className="mr-1 inline" size={15} /></button><button onClick={() => actionToast("تعرف أكثر على مزايا المهنيين")} className="rounded-xl border border-white/20 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10">كيف تعمل المنصة؟</button></div><div className="mt-8 flex items-center gap-5 text-xs font-semibold text-[#bdcbe0]"><span className="flex items-center gap-1.5"><Check size={15} className="text-[#f1a262]" /> بدون عمولة أول شهر</span><span className="flex items-center gap-1.5"><Check size={15} className="text-[#f1a262]" /> بطاقة QR مجانية</span></div></div><div className="relative mx-auto w-full max-w-[540px]"><div className="absolute -inset-6 rounded-[38px] bg-[#1b407c] opacity-60 blur-2xl" /><div className="relative overflow-hidden rounded-[26px] border border-white/15 bg-[#18396e] p-3 shadow-2xl"><div className="overflow-hidden rounded-[18px]"><img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1100&q=90" alt="مهني في موقع عمل" className="h-[310px] w-full object-cover" /></div><div className="flex items-center justify-between px-3 pb-2 pt-4"><div><div className="text-sm font-extrabold">بطاقتك المهنية</div><div className="mt-1 text-xs text-[#b9c8dd]">تظهر للعميل كل اللي يحتاجه</div></div><div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#102d5e]"><span className="text-xl font-black">⌗</span></div></div></div></div></div></section>

        <section id="market" className="container py-20 sm:py-24"><SectionHeading eyebrow="من مهني إلى مهني" title="أدوات شغلك، أقرب لك" link="دخول السوق" /><div className="grid gap-5 md:grid-cols-3">{listings.map((item) => <article key={item.title} className="lift overflow-hidden rounded-[20px] border border-[#102d5e]/8 bg-white"><div className="relative h-48 overflow-hidden bg-[#f1f3f5]"><img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" /><span className="absolute right-3 top-3 rounded-lg bg-white/90 px-2.5 py-1.5 text-[11px] font-bold text-[#1b8a73]">{item.badge}</span><button onClick={() => actionToast("تم حفظ المنتج")} className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#8090a5]"><Heart size={15} /></button></div><div className="p-4"><h3 className="mb-2 text-sm font-extrabold text-[#102d5e]">{item.title}</h3><div className="mb-4 flex items-center gap-1.5 text-xs font-medium text-[#8a97a9]"><MapPin size={13} />{item.meta}</div><div className="flex items-center justify-between border-t border-[#102d5e]/8 pt-3"><span className="display-font text-lg font-extrabold text-[#dc6b1b]">{item.price} <small className="text-xs font-bold text-[#8a97a9]">د.أ</small></span><button onClick={() => actionToast(`فتح إعلان ${item.title}`)} className="rounded-lg bg-[#eef3fa] px-3 py-2 text-xs font-bold text-[#254d88]">التفاصيل</button></div></div></article>)}</div></section>

        <section id="jobs" className="container pb-20 sm:pb-24"><div className="relative overflow-hidden rounded-[28px] bg-[#fff0e4] p-7 sm:p-10"><div className="relative z-10 max-w-[570px]"><div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[.15em] text-[#dc6b1b]">لأصحاب الأعمال <span className="h-1.5 w-1.5 rounded-full bg-[#dc6b1b]" /></div><h2 className="display-font text-2xl font-extrabold leading-[1.4] text-[#102d5e] sm:text-3xl">عندك شغل؟<br />وصل طلبك لمن يعرف يعمله.</h2><p className="mt-4 max-w-[480px] text-sm leading-7 text-[#61718a]">انشر طلبك، استقبل عروض من مهنيين موثّقين، واختار الأنسب لك خلال ساعة.</p><button onClick={() => actionToast("نموذج طلب عرض السعر سيجهز لك الآن")} className="mt-6 rounded-xl bg-[#102d5e] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#102d5e]/15 hover:bg-[#183d76]">اطلب عرض سعر <ArrowLeft className="mr-1 inline" size={15} /></button></div><div className="absolute -left-8 -bottom-24 h-72 w-72 rounded-full bg-[#f4c7a6]/60 blur-2xl" /><div className="absolute left-[12%] top-9 hidden rotate-[-8deg] rounded-2xl border border-white bg-white/80 p-4 shadow-xl sm:block"><MessageCircle className="text-[#dc6b1b]" size={25} /><div className="mt-2 text-xs font-bold text-[#102d5e]">3 عروض خلال ساعة</div></div><div className="absolute left-[32%] bottom-9 hidden rotate-[7deg] rounded-2xl border border-white bg-white/80 p-4 shadow-xl sm:block"><Users className="text-[#254d88]" size={25} /><div className="mt-2 text-xs font-bold text-[#102d5e]">+2,500 مهني</div></div></div></section>
      </main>

      <footer className="border-t border-[#102d5e]/10 bg-white"><div className="container flex flex-col items-start justify-between gap-5 py-8 sm:flex-row sm:items-center"><div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#102d5e] text-white"><Wrench size={18} /></span><span className="display-font text-lg font-extrabold text-[#102d5e]">مهنتي<span className="text-[#dc6b1b]">.</span></span></div><div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#71809a]"><a href="#top" className="hover:text-[#dc6b1b]">عن مهنتي</a><a href="#jobs" className="hover:text-[#dc6b1b]">للشركات</a><a href="#" onClick={(e) => { e.preventDefault(); actionToast("سياسة الخصوصية قريباً"); }} className="hover:text-[#dc6b1b]">الخصوصية</a><span>© 2026 مهنتي</span></div><div className="flex items-center gap-2 text-xs font-semibold text-[#8a97a9]"><Store size={15} /> الأردن والعالم العربي</div></div></footer>
    </div>
  );
}

function ArrowDownIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>;
}
