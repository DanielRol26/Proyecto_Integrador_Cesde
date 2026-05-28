const fetchBtn = document.getElementById('fetch-btn');
const URI_API = 'https://6a0f75e0d2a9857070357693.mockapi.io/api/remainders';
const brandsContainer = document.getElementById('brands-container');
const brandsCounter = document.getElementById('brands-counter');

fetchBtn.addEventListener('click', async () => {

    fetchBtn.disabled = true;

    brandsContainer.textContent = '';
    brandsCounter.textContent = '0';

    fetchBtn.replaceChildren();

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

        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await fetch(`${URI_API}/brands`);
        if (!response.ok) {
            throw new Error('Error al obtener las tiendas');
        }
        const brands = await response.json();
        const total = brands.length;

        brandsContainer.replaceChildren();

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
        });
        brandsCounter.textContent = total;

        if (condition) {
            
        }

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