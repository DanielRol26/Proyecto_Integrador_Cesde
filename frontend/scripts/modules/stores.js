const fetchBtn = document.getElementById('fetch-btn');
const URI_API = 'https://6a0f75e0d2a9857070357693.mockapi.io/api/remainders';
const brandsContainer = document.getElementById('brands-container');
const brandsCounter = document.getElementById('brands-counter');
const hero = document.getElementById('hero');
const heroTitle = document.getElementById('hero-title');
const heroDescription = document.getElementById('hero-description');
const storesContainer = document.getElementById('stores-container');
const backToBrands = document.getElementById('back-to-brands');
const originalHeroClass = hero.className;
const originalHeroImage = "url('../assets/images/stores/hero/store-hero-banner.png')";
const resultsTitle = document.getElementById('results-title');

fetchBtn.addEventListener('click', async () => {

    fetchBtn.disabled = true;

    brandsContainer.textContent = '';
    brandsCounter.textContent = '0';

    fetchBtn.textContent = '';

    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'flex items-center gap-[10px]';

    const loadingSpinner = document.createElement('span');
    loadingSpinner.className = 'w-[16px] h-[16px] border-2 border-white border-t-transparent rounded-full animate-spin';

    const loadingText = document.createElement('span');
    loadingText.textContent = 'Cargando...';

    loadingContainer.appendChild(loadingSpinner);
    loadingContainer.appendChild(loadingText);

    fetchBtn.appendChild(loadingContainer);

    try {

        const response = await fetch(`${URI_API}/brands`);
        if (!response.ok) {
            throw new Error('Error al obtener las tiendas');
        }
        const brands = await response.json();
        const total = brands.length;

        brandsContainer.replaceChildren();
        await new Promise(resolve => setTimeout(resolve, 2000));

        brands.forEach(data => {
            const cardBrand = document.createElement('a');
            cardBrand.href = `#${data.storeName.trim().toLowerCase().replaceAll(' ', '-')}`;
            cardBrand.className = 'w-full bg-white rounded-[6px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.10)] group cursor-pointer';

            const imageContainer = document.createElement('div');
            imageContainer.className = 'h-[180px] relative';

            const mainImage = document.createElement('img');
            mainImage.src = data.mainImage;
            mainImage.alt = data.storeName;
            mainImage.className = 'w-full h-full object-cover object-[center_0%]';

            const logoContainer = document.createElement('div');
            logoContainer.className = 'w-[100px] h-[100px] rounded-full overflow-hidden flex items-center justify-center bg-white absolute top-[62%] left-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.10)]';

            const logoImage = document.createElement('img');
            logoImage.src = data.logo;
            logoImage.alt = data.storeName;
            logoImage.className = 'w-[75%] h-[75%] object-contain';

            const infoContainer = document.createElement('div');
            infoContainer.className = 'p-[25px] pt-[30px] leading-[25px] relative';

            const titleCard = document.createElement('h2');
            titleCard.className = "text-[26px] font-['Cormorant_Garamond'] font-bold";
            titleCard.textContent = data.storeName;

            const descriptionCard = document.createElement('p');
            descriptionCard.className = 'text-[13px] text-gray-500';
            descriptionCard.textContent = data.description;

            const brandTypeContainer = document.createElement('div');
            brandTypeContainer.className = 'flex items-center gap-[8px] mt-[10px]';

            const locationIcon = document.createElement('img');
            locationIcon.src = 'https://lh3.googleusercontent.com/d/1o_H-OYRof7-c021QaKVtrjjDzpqJ8tpK';
            locationIcon.alt = 'location icon';
            locationIcon.className = 'w-[18px] h-[18px] opacity-[0.75]';

            const brandType = document.createElement('span');
            brandType.className = "text-[#6b6b6b] text-[12px] tracking-[0.5px] font-semibold font-['Inter']";
            brandType.textContent = data.brandType;

            const fetchStoresButton = document.createElement('button');
            fetchStoresButton.className = 'absolute right-[30px] top-[90px] group-hover:translate-x-[10px] duration-300 transition-all';

            const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            arrowSvg.setAttribute('width', '25');
            arrowSvg.setAttribute('height', '25');
            arrowSvg.setAttribute('viewBox', '0 0 20 20');
            arrowSvg.setAttribute('fill', 'none');

            const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            arrowPath.setAttribute('d', 'M4 10H16M16 10L11 5M16 10L11 15');
            arrowPath.setAttribute('stroke', 'black');
            arrowPath.setAttribute('stroke-width', '1.8');
            arrowPath.setAttribute('stroke-linecap', 'round');
            arrowPath.setAttribute('stroke-linejoin', 'round');

            arrowSvg.appendChild(arrowPath);
            fetchStoresButton.appendChild(arrowSvg);

            brandTypeContainer.appendChild(locationIcon);
            brandTypeContainer.appendChild(brandType);

            infoContainer.appendChild(titleCard);
            infoContainer.appendChild(descriptionCard);
            infoContainer.appendChild(brandTypeContainer);
            infoContainer.appendChild(fetchStoresButton);

            imageContainer.appendChild(mainImage);
            imageContainer.appendChild(logoContainer);

            logoContainer.appendChild(logoImage);

            cardBrand.appendChild(imageContainer);
            cardBrand.appendChild(infoContainer);

            brandsContainer.appendChild(cardBrand);

            cardBrand.addEventListener('click', async (event) => {
                event.preventDefault();

                hero.className = "bg-cover bg-[position:30%_70%] min-h-[320px] mt-[100px] sm:mt-[120px] lg:mt-[150px] px-[20px] sm:px-[40px] lg:px-[80px] py-[50px] flex flex-col lg:flex-row items-start lg:items-center justify-center lg:justify-start gap-[35px] lg:gap-[130px]";

                hero.style.backgroundImage = `url(${data.mainImage})`;

                fetchBtn.className = 'hidden';

                heroTitle.textContent = data.storeName;
                heroTitle.className = "text-[56px] sm:text-[56px] lg:text-[56px] font-['Cormorant_Garamond'] leading-none mb-[18px] font-semibold text-white";

                heroDescription.textContent = data.description;
                heroDescription.classList.add('text-white');

                brandsContainer.classList.add('hidden');
                storesContainer.classList.remove('hidden');
                backToBrands.classList.remove('hidden');

                cardBrand.href = `#${data.storeName.trim().toLowerCase().replaceAll(' ', '-')}`;

                const loadingOverlay = document.createElement('div');
                loadingOverlay.className = 'fixed inset-0 bg-black/40 backdrop-blur-[3px] flex items-center justify-center z-[9999]';
                const loadingContent = document.createElement('div');
                loadingContent.className = 'flex flex-col items-center gap-[15px]';
                const loadingSpinner = document.createElement('span');
                loadingSpinner.className = 'w-[55px] h-[55px] border-[4px] border-white border-t-transparent rounded-full animate-spin';
                const loadingText = document.createElement('p');
                loadingText.className = 'text-white text-[15px] tracking-[2px] font-["Inter"]';
                loadingText.textContent = 'CARGANDO TIENDAS';
                loadingContent.appendChild(loadingSpinner);
                loadingContent.appendChild(loadingText);
                loadingOverlay.appendChild(loadingContent);
                storesContainer.appendChild(loadingOverlay);

                await new Promise(resolve => setTimeout(resolve, 1500));

                const response = await fetch(`${URI_API}/brandStores`);
                const stores = await response.json();
                const selectedBrandSlug = data.storeName.trim().toLowerCase().replaceAll(' ', '-');
                const filteredStores = stores.filter(store => store.brandSlug === selectedBrandSlug);

                resultsTitle.textContent = 'Tiendas encontradas';
                brandsCounter.textContent = filteredStores.length;
                storesContainer.replaceChildren();

                filteredStores.forEach(data => {

                    const storeCard = document.createElement('article');
                    storeCard.className = 'bg-white rounded-[8px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.10)]';

                    const storeImage = document.createElement('img');
                    storeImage.src = data.images[0];
                    storeImage.alt = data.storeName;
                    storeImage.className = 'w-full h-[180px] object-cover';

                    const storeInfo = document.createElement('div');
                    storeInfo.className = 'p-[18px]';

                    const storeTitle = document.createElement('h2');
                    storeTitle.className = "text-[28px] font-['Cormorant_Garamond'] font-semibold";
                    storeTitle.textContent = data.storeName;

                    const storeDescription = document.createElement('p');
                    storeDescription.className = 'text-[13px] text-[#6b6b6b] mt-[3px]';
                    storeDescription.textContent = data.description;

                    const addressText = document.createElement('p');
                    addressText.className = 'text-[13px] mt-[18px]';
                    addressText.textContent = `${data.address}, ${data.city}`;

                    const phoneText = document.createElement('p');
                    phoneText.className = 'text-[13px] mt-[8px]';
                    phoneText.textContent = data.phone;

                    const openingHours = document.createElement('p');
                    openingHours.className = 'text-[13px] mt-[8px]';
                    openingHours.textContent = data.openingHours;

                    const statusText = document.createElement('p');
                    statusText.className = 'text-[13px] mt-[15px] text-green-600 font-semibold';
                    statusText.textContent = data.status;

                    storeInfo.appendChild(storeTitle);
                    storeInfo.appendChild(storeDescription);
                    storeInfo.appendChild(addressText);
                    storeInfo.appendChild(phoneText);
                    storeInfo.appendChild(openingHours);
                    storeInfo.appendChild(statusText);

                    storeCard.appendChild(storeImage);
                    storeCard.appendChild(storeInfo);

                    storesContainer.appendChild(storeCard);

                });
            })
        });
        brandsCounter.textContent = total;

    } catch (error) {
        console.log('error');
    } finally {

        fetchBtn.disabled = false;

        fetchBtn.replaceChildren();

        const buttonText = document.createElement('span');
        buttonText.textContent = 'OBTENER TIENDAS';

        fetchBtn.appendChild(buttonText);

    }

})

backToBrands.addEventListener('click', () => {
    hero.className = originalHeroClass;
    hero.style.backgroundImage = originalHeroImage;

    heroTitle.className = "text-[36px] sm:text-[42px] lg:text-[48px] font-['Cormorant_Garamond'] leading-none mb-[18px] font-semibold";
    heroTitle.innerHTML = 'Tiendas <br> disponibles';

    heroDescription.innerHTML = 'Descubre todas nuestras tiendas disponibles, <br class="hidden sm:block"> visitanos con tu familia y amigos';
    heroDescription.classList.remove('text-white');

    fetchBtn.className = 'bg-black text-white py-[18px] px-[70px] sm:px-[90px] lg:px-[120px] text-[13px] tracking-[1px] hover:bg-[#1c1c1c] transition-all duration-300';

    resultsTitle.textContent = 'Marcas encontradas';
    brandsCounter.textContent = brandsContainer.children.length;

    brandsContainer.classList.remove('hidden');
    storesContainer.replaceChildren();
    storesContainer.classList.add('hidden');
    backToBrands.classList.add('hidden');
    storesContainer.removeChild(loadingOverlay);
});