import React, { useState, useEffect, useRef } from 'react';

// --- Custom Hook untuk Tema ---
function useDarkMode() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = window.localStorage.getItem('theme');
            return savedTheme || 'light';
        }
        return 'light';
    });

    const toggleTheme = (event) => {
        if (!document.startViewTransition) {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            document.documentElement.classList.remove(theme);
            document.documentElement.classList.add(newTheme);
            setTheme(newTheme);
            window.localStorage.setItem('theme', newTheme);
            return;
        }

        const x = event?.clientX ?? window.innerWidth / 2;
        const y = event?.clientY ?? window.innerHeight / 2;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            document.documentElement.classList.remove(theme);
            document.documentElement.classList.add(newTheme);
            setTheme(newTheme);
            window.localStorage.setItem('theme', newTheme);
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            document.documentElement.animate(
                {
                    clipPath: theme === 'light' ? clipPath : [...clipPath].reverse(),
                },
                {
                    duration: 900,
                    easing: 'ease-in-out',
                    pseudoElement: theme === 'light' 
                        ? '::view-transition-new(root)' 
                        : '::view-transition-old(root)',
                }
            );
        });
    };

    useEffect(() => {
        if (theme) {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(theme);
        }
    }, [theme]);

    return [theme, toggleTheme];
}

// --- Data Mockup ---
const postsData = [
    { id: 1, title: 'Judul Postingan 1', category: 'Kategori 1', imageUrl: 'https://placehold.co/400x400/eeeeee/333333?text=Foto+1', detailImage: 'https://placehold.co/400x600/eeeeee/333333?text=Foto+Detail+1' },
    { id: 2, title: 'Judul Postingan 2', category: 'Kategori 2', imageUrl: 'https://placehold.co/400x400/eeeeee/333333?text=Foto+2', detailImage: 'https://placehold.co/400x600/eeeeee/333333?text=Foto+Detail+2' },
    { id: 3, title: 'Judul Postingan 3', category: 'Kategori 1', imageUrl: 'https://placehold.co/400x400/eeeeee/333333?text=Foto+3', detailImage: 'https://placehold.co/400x600/eeeeee/333333?text=Foto+Detail+3' },
];

const highlightData = [
    { id: 1, imageUrl: 'https://placehold.co/800x450/1e293b/ffffff?text=Iklan+1', linkUrl: '#' },
    { id: 2, imageUrl: 'https://placehold.co/800x450/4338ca/ffffff?text=Iklan+2', linkUrl: '#' },
    { id: 3, imageUrl: 'https://placehold.co/800x450/be123c/ffffff?text=Iklan+3', linkUrl: '#' },
    { id: 4, imageUrl: 'https://placehold.co/800x450/166534/ffffff?text=Iklan+4', linkUrl: '#' },
];

const suggestedCategories = ['Animasi', 'Asia/Global random', 'Japanese', 'Lifestyle', 'Teknologi'];

// --- Komponen Ikon ---
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const UpArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const TelegramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.57c-.28 1.13-1.04 1.4-1.74.88L14.25 16l-4.12 3.9c-.78.72-1.4.34-1.68-.65z"></path></svg>;
const SearchPageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const GridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;

// --- HighlightSection (Banner Geser dengan Kontrol) ---
function HighlightSection() {
    const slidesData = [highlightData[highlightData.length - 1], ...highlightData, highlightData[0]];
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [drag, setDrag] = useState({ start: 0, end: 0, isDragging: false });
    const [isPlaying, setIsPlaying] = useState(true);
    const timeoutRef = useRef(null);
    const transitionDuration = 500;

    const slideTo = (index) => {
        setIsTransitioning(true);
        setCurrentIndex(index);
    };

    useEffect(() => {
        const resetTimeout = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        resetTimeout();
        if (isPlaying && !drag.isDragging) {
            timeoutRef.current = setTimeout(() => slideTo(currentIndex + 1), 3500);
        }
        return resetTimeout;
    }, [currentIndex, drag.isDragging, isPlaying]);

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === 0) setCurrentIndex(slidesData.length - 2);
        else if (currentIndex === slidesData.length - 1) setCurrentIndex(1);
    };

    const handleTouchStart = (e) => setDrag({ ...drag, isDragging: true, start: e.touches[0].clientX, end: 0 });
    const handleTouchMove = (e) => { if (drag.isDragging) setDrag({ ...drag, end: e.touches[0].clientX }); };
    const handleTouchEnd = () => {
        if (!drag.isDragging) return;
        const dragDistance = drag.start - drag.end;
        if (Math.abs(dragDistance) > 50) slideTo(dragDistance > 0 ? currentIndex + 1 : currentIndex - 1);
        setDrag({ start: 0, end: 0, isDragging: false });
    };
    
    const trackStyle = {
        transform: `translateX(calc(-${currentIndex * 100}% - ${drag.isDragging ? (drag.start - drag.end) : 0}px))`,
        transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : 'none',
    };

    const displayIndex = (currentIndex - 1 + highlightData.length) % highlightData.length;

    return (
        <section className="w-full select-none py-6">
            <div className="overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <div className="flex" style={trackStyle} onTransitionEnd={handleTransitionEnd}>
                    {slidesData.map((item, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <a href={item.linkUrl} className="block aspect-video group">
                                <img src={item.imageUrl} alt={`Iklan ${item.id}`} className="w-full h-full object-cover" draggable="false" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="flex space-x-2">
                    {highlightData.map((_, index) => (
                        <button key={index} onClick={() => slideTo(index + 1)} className={`h-2 rounded-full transition-all duration-300 ${index === displayIndex ? 'w-5 bg-blue-500' : 'w-2 bg-slate-300 dark:bg-slate-600'}`}></button>
                    ))}
                </div>
                <button onClick={() => setIsPlaying(p => !p)} className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">
                    {isPlaying ? <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" /></svg> : <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>}
                </button>
            </div>
        </section>
    );
}

// --- Komponen-komponen lainnya ---
function DetailPage({ post, onBack }) {
    if (!post) return <div className="text-center p-10">Postingan tidak ditemukan.</div>;
    return (
        <main className="p-4 sm:p-6 flex-grow">
            <header className="flex items-center mb-4"><button onClick={onBack} className="p-2 rounded-full text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"><BackIcon /></button><h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 ml-2">{post.title}</h1></header>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 p-4 max-w-md mx-auto">
                <img src={post.detailImage} alt={post.title} className="w-full h-auto object-cover rounded-lg mb-6" />
                <h2 className="text-lg font-semibold text-center text-gray-700 dark:text-slate-300 mb-4">Tautan Video</h2>
                <ul className="space-y-3">
                    <li><a href="#" className="block w-full text-center px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">Tonton Video 1</a></li>
                    <li><a href="#" className="block w-full text-center px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">Tonton Video 2</a></li>
                </ul>
            </div>
        </main>
    );
}

function SearchResultsPage({ searchQuery, searchResults, onTitleClick, onBack, onCategoryClick }) {
    return (
        <main className="p-4 sm:p-6 flex-grow">
            <div className="flex items-center justify-between mb-5"><div className="flex items-center"><SearchPageIcon /><h2 className="text-xl font-bold text-gray-800 dark:text-slate-200">Hasil untuk: "<span className="text-blue-500">{searchQuery}</span>"</h2></div><button onClick={onBack} className="p-2 rounded-full text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"><CloseIcon /></button></div>
            {searchResults.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">{searchResults.map(post => <PostCard key={post.id} post={post} viewMode="grid" onTitleClick={onTitleClick} />)}</div> : <div className="text-center py-10 text-gray-500 dark:text-slate-400"><p>Tidak ada postingan yang cocok ditemukan.</p></div>}
            <div className="mt-12"><h3 className="text-lg font-semibold text-gray-700 dark:text-slate-300 mb-4">Mungkin Anda suka?</h3><div className="flex flex-wrap gap-3">{suggestedCategories.map(cat => (<button key={cat} onClick={() => onCategoryClick(cat)} className="px-4 py-2 bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-full hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-colors">{cat}</button>))}</div></div>
        </main>
    );
}

function PostCard({ post, viewMode, onTitleClick }) {
    if (viewMode === 'list') {
        return (
            <div className="flex items-center space-x-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-slate-700/50 transition-shadow duration-300 p-3 w-full overflow-hidden border border-transparent dark:border-slate-700">
                <img src={post.imageUrl} alt={post.title} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-grow">
                    <button onClick={() => onTitleClick(post.id)} className="text-left w-full"><h3 className="font-semibold text-gray-800 dark:text-slate-200 text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors">{post.title}</h3></button>
                    <p className="text-sm text-gray-500 dark:text-slate-400">{post.category}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-slate-700/50 transition-shadow duration-300 overflow-hidden group border border-transparent dark:border-slate-700">
            <div className="overflow-hidden"><img src={post.imageUrl} alt={post.title} className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300" /></div>
            <div className="p-4">
                <button onClick={() => onTitleClick(post.id)} className="text-left w-full"><h3 className="font-semibold text-gray-800 dark:text-slate-200 text-base truncate hover:text-blue-500 dark:hover:text-blue-400 transition-colors">{post.title}</h3></button>
                <div className="flex items-center justify-between mt-2"><p className="text-sm text-gray-500 dark:text-slate-400 truncate">{post.category}</p></div>
            </div>
        </div>
    );
}

function Header({ theme, toggleTheme, onSearchSubmit, onSearchClick, onSearchClose, isSearchOpen }) {
    const headerRef = useRef(null);
    const themeButtonRef = useRef(null); 
    const [localQuery, setLocalQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => { const handleClickOutside = (event) => { if (headerRef.current && !headerRef.current.contains(event.target)) setIsMenuOpen(false); }; document.addEventListener('mousedown', handleClickOutside); return () => document.removeEventListener('mousedown', handleClickOutside); }, []);
    const handleKeyDown = (e) => { if (e.key === 'Enter' && localQuery.trim() !== '') onSearchSubmit(localQuery); };
    const handleThemeToggleClick = () => { if (!themeButtonRef.current) { toggleTheme(); return; } const rect = themeButtonRef.current.getBoundingClientRect(); const x = rect.left + rect.width / 2; const y = rect.top + rect.height / 2; toggleTheme({ clientX: x, clientY: y }); };
    return (
        <div ref={headerRef} className="relative">
            <header className="sticky top-0 z-20 flex items-center justify-between p-3 sm:p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-slate-800">
                {isSearchOpen ? (
                    <div className="flex items-center w-full">
                        <input type="text" placeholder="Cari postingan..." value={localQuery} onChange={(e) => setLocalQuery(e.target.value)} onKeyDown={handleKeyDown} className="w-full bg-transparent text-gray-800 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none text-lg" autoFocus />
                        <button onClick={onSearchClose} className="p-2 rounded-full text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"><CloseIcon /></button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center space-x-3"><button onClick={() => setIsMenuOpen(p => !p)} className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500 dark:bg-blue-600 text-white shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors" aria-expanded={isMenuOpen}>{isMenuOpen ? <UpArrowIcon /> : <MenuIcon />}</button><h1 className="text-2xl font-bold text-gray-800 dark:text-slate-200 tracking-tight">Sandex</h1></div>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <button onClick={onSearchClick} className="p-2 rounded-full text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"><SearchIcon /></button>
                            <button ref={themeButtonRef} onClick={handleThemeToggleClick} className="p-2 rounded-full text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle Dark Mode">{theme === 'light' ? <SunIcon /> : <MoonIcon />}</button>
                        </div>
                    </>
                )}
            </header>
            <div className={`absolute top-full left-0 right-0 z-10 p-2 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-100 dark:border-slate-700 p-2">
                    <nav className="flex flex-col space-y-1">
                        <a href="#" className="px-4 py-2 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors">Halaman utama</a>
                        <a href="#" className="px-4 py-2 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors">Live local / local acak</a>
                        <a href="#" className="px-4 py-2 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors">Cosplay random</a>
                    </nav>
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="bg-slate-800 dark:bg-black text-slate-400 mt-auto">
            <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div><h3 className="text-sm font-bold tracking-wider uppercase text-slate-300 mb-4">SUPPORT</h3><a href="#" className="block text-lg hover:text-white transition-colors">Saweria</a></div>
                    <div><h3 className="text-sm font-bold tracking-wider uppercase text-slate-300 mb-4">ABOUT</h3><a href="#" className="block text-lg hover:text-white transition-colors">About Us</a></div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-700 dark:border-slate-600 text-center text-slate-500"><p>&copy; {new Date().getFullYear()} Sandex. All rights reserved.</p></div>
            </div>
        </footer>
    );
}

function ChatButton() {
    return (<a href="https://t.me/SandexReal" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-30 h-16 w-16 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all transform hover:scale-110" aria-label="Chat di Telegram"><TelegramIcon /></a>);
}

export default function App() {
    const [theme, toggleTheme] = useDarkMode(); 
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState('home'); 
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelectPost = (id) => { setCurrentPage('detail'); setSelectedPostId(id); setIsSearchOpen(false); window.scrollTo(0, 0); };
    const handleGoHome = () => { setCurrentPage('home'); setSelectedPostId(null); setSearchQuery(''); setIsSearchOpen(false); };
    const handleSearchSubmit = (query) => { setSearchQuery(query); setCurrentPage('search-results'); setIsSearchOpen(false); };
    const handleCategoryClick = (category) => handleSearchSubmit(category);
    
    let pageContent;
    switch (currentPage) {
        case 'detail': pageContent = <DetailPage post={postsData.find(p => p.id === selectedPostId)} onBack={handleGoHome} />; break;
        case 'search-results': const searchResults = postsData.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())); pageContent = <SearchResultsPage searchQuery={searchQuery} searchResults={searchResults} onTitleClick={handleSelectPost} onBack={handleGoHome} onCategoryClick={handleCategoryClick} />; break;
        default: pageContent = (<><HighlightSection /><main className="p-4 sm:p-6 flex-grow"><div className="flex items-center justify-between mb-5"><h2 className="text-xl font-bold text-gray-800 dark:text-slate-200">Postingan Terbaru</h2><div className="flex items-center space-x-2 p-1 bg-gray-200 dark:bg-slate-800 rounded-lg"><button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-blue-600' : 'text-gray-500'}`}><GridIcon /></button><button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-blue-600' : 'text-gray-500'}`}><ListIcon /></button></div></div><div className={`transition-all duration-300 ${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5' : 'flex flex-col space-y-4'}`}>{postsData.map(post => <PostCard key={post.id} post={post} viewMode={viewMode} onTitleClick={handleSelectPost} />)}</div></main></>);
    }

    return (
        <>
            <style>{`
                ::view-transition-old(root),
                ::view-transition-new(root) {
                  animation: none;
                  mix-blend-mode: normal;
                }
                .dark::view-transition-old(root) { z-index: 1; }
                .dark::view-transition-new(root) { z-index: 999; }
                ::view-transition-old(root) { z-index: 999; }
                ::view-transition-new(root) { z-index: 1; }
            `}</style>
            
            <div className="bg-slate-100 dark:bg-slate-950 font-sans">
                <div className="max-w-6xl mx-auto min-h-screen flex flex-col">
                    <Header theme={theme} toggleTheme={toggleTheme} onSearchClick={() => setIsSearchOpen(true)} onSearchClose={() => setIsSearchOpen(false)} isSearchOpen={isSearchOpen} onSearchSubmit={handleSearchSubmit} />
                    <div className="flex-grow">{pageContent}</div>
                    <Footer />
                </div>
                <ChatButton />
            </div>
        </>
    );
}
