const chartColors = {
    primary: '#ff7700',
    secondary: '#1f1f1f',
    success: '#28a745',
    danger: '#dc3545',
    info: '#17a2b8',
    warning: '#ffc107',
    gray: '#666666'
};
document.addEventListener('DOMContentLoaded', function() {
    initializePanel();
    if ($('#aracFiltresi').length) {
        $('#aracFiltresi').select2({
            placeholder: 'Araç seçin',
            allowClear: true,
            closeOnSelect: false
        });
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.select2-container').length && 
                !$(e.target).closest('.select2-dropdown').length) {
                $('#aracFiltresi').select2('close');
            }
        });
        $('#aracFiltresi').on('select2:closing', function(e) {
            if ($(document.activeElement).closest('.select2-container').length) {
                e.preventDefault();
            }
        });
    }
});

function initializePanel() {
    const menuItems = document.getElementById('menuItems');
    const menuler = [
        { sayfa: 'anasayfa', baslik: 'Ana Sayfa', icon: 'fa-home' },
        { sayfa: 'araclar', baslik: 'Araçlar', icon: 'fa-car' },
        { sayfa: 'musteriler', baslik: 'Müşteriler', icon: 'fa-users' },
        { sayfa: 'kiralamalar', baslik: 'Kiralamalar', icon: 'fa-key' },
        { sayfa: 'calisanlar', baslik: 'Çalışanlar', icon: 'fa-user-tie' }
    ];

    menuItems.innerHTML = menuler.map(menu => `
        <a class="nav-link ${menu.sayfa === 'anasayfa' ? 'active' : ''}" href="#" onclick="showPage('${menu.sayfa}')">
            <i class="fas ${menu.icon}"></i>
            <span>${menu.baslik}</span>
        </a>
    `).join('');
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            showPage(this.getAttribute('onclick').match(/'(.*?)'/)[1]);
        });
    });
    showPage('anasayfa');

    checkBakimBildirimleri();
}

    function showPage(pageId) {
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.sidebar .nav-link[onclick="showPage('${pageId}')"]`).classList.add('active');
    const pageContent = document.getElementById('pageContent');
    const templates = {
        anasayfa: `
            <div class="container mt-4">
                <div class="page-header">
                    <h2>Araç Kiralama Yönetim Paneli</h2>
                </div>
                
                <!-- İstatistik Kartları -->
                <div class="row g-3 mb-4">
                    <div class="col-md-3">
                        <div class="stats-card musait">
                            <div class="card-icon">
                                <i class="fas fa-key"></i>
                            </div>
                            <div class="card-content">
                                <h3 class="card-title">Aktif Kiralamalar</h3>
                                <p class="card-text" id="aktifKiralamalar">0</p>
                                <small class="text-muted">Devam eden kiralama</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stats-card kirada">
                            <div class="card-icon">
                                <i class="fas fa-car"></i>
                            </div>
                            <div class="card-content">
                                <h3 class="card-title">Toplam Araç</h3>
                                <p class="card-text" id="toplamArac">0</p>
                                <small class="text-muted">Filodaki araç sayısı</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stats-card bakimda">
                            <div class="card-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="card-content">
                                <h3 class="card-title">Toplam Müşteri</h3>
                                <p class="card-text" id="toplamMusteri">0</p>
                                <small class="text-muted">Kayıtlı müşteri</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stats-card gelir">
                            <div class="card-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="card-content">
                                <h3 class="card-title">Aylık Gelir</h3>
                                <p class="card-text" id="aylikGelir">₺0</p>
                                <small class="text-muted">Bu ayki toplam gelir</small>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Araç Performans Grafiği -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header d-flex justify-content-between align-items-center flex-wrap">
                                <h5 class="card-title mb-0">Araç Performans Analizi</h5>
                                <div class="d-flex gap-2 flex-wrap">
                                    <select id="performansMetrigi" class="form-select form-select-sm" style="width: 150px;">
                                        <option value="kiralama">Kiralama Sayısı</option>
                                        <option value="kazanc">Toplam Kazanç</option>
                                    </select>
                                    <select id="aracFiltresi" class="form-select form-select-sm" style="width: 200px;" multiple>
                                        <!-- Araçlar JavaScript ile doldurulacak -->
                                    </select>
                                    <select id="tarihAraligi" class="form-select form-select-sm" style="width: 150px;">
                                        <option value="30">Son 30 Gün</option>
                                        <option value="90">Son 3 Ay</option>
                                        <option value="180">Son 6 Ay</option>
                                        <option value="365">Son 1 Yıl</option>
                                    </select>
                                </div>
                            </div>
                            <div class="card-body">
                                <div style="height: 500px;"> <!-- Yüksekliği 400px'den 500px'e çıkardık -->
                                    <canvas id="aracPerformansGrafik"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Yeni grafikler için boş container -->
                <div class="row g-3" id="customCharts">
                    <!-- Buraya yeni grafikler eklenecek -->
                </div>
            </div>
        `,
        araclar: `
            <div class="container mt-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Araçlar</h2>
                    <div class="d-flex gap-2">
                        <button class="btn btn-info" onclick="showBakimBildirimleri()">
                            <i class="fas fa-bell"></i> Bakım Bildirimleri
                            <span id="bakimBildirimSayisi" class="badge bg-danger ms-1" style="display: none;">0</span>
                        </button>
                    <button class="btn btn-primary" onclick="showAracModal()">
                        <i class="fas fa-plus"></i> Yeni Araç Ekle
                    </button>
                    </div>
                </div>
                <div class="row" id="araclarContainer">
                    <!-- JavaScript ile doldurulacak -->
                </div>
            </div>
        `,
        musteriler: `
            <div class="container mt-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Müşteriler</h2>
                    <button class="btn btn-primary" onclick="showMusteriModal()">
                        <i class="fas fa-plus"></i> Yeni Müşteri Ekle
                    </button>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ad</th>
                                <th>Soyad</th>
                                <th>TC No</th>
                                <th>Telefon</th>
                                <th>Email</th>
                                <th>Ehliyet Sınıfı</th>
                                <th>Adres</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody id="musterilerTablo"></tbody>
                    </table>
                </div>
            </div>
        `,
        kiralamalar: `
            <div class="container-fluid p-0">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Kiralamalar</h2>
                    <button class="btn btn-primary" onclick="showKiralamaModal()">
                        <i class="fas fa-plus"></i> Yeni Kiralama
                    </button>
                </div>
                <div class="table-responsive-xl">
                    <table class="table table-striped table-sm kiralamalar-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Müşteri</th>
                                <th>Araç</th>
                                <th>Başlangıç</th>
                                <th>Bitiş</th>
                                <th>Gün</th>
                                <th>Günlük</th>
                                <th>Toplam</th>
                                <th>KM (Alış/Teslim)</th>
                                <th>Ödeme</th>
                                <th>Durum</th>
                                <th>İşlemi Yapan</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody id="kiralamalarTablo"></tbody>
                    </table>
                </div>
            </div>
        `,
        calisanlar: `
            <div class="container mt-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Çalışanlar</h2>
                    <button class="btn btn-primary" onclick="showCalisanModal()">
                        <i class="fas fa-plus"></i> Yeni Çalışan Ekle
                    </button>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ad</th>
                                <th>Soyad</th>
                                <th>TC No</th>
                                <th>Telefon</th>
                                <th>Email</th>
                                <th>Pozisyon</th>
                                <th>Maaş</th>
                                <th>Durum</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody id="calisanlarTablo"></tbody>
                    </table>
                </div>
            </div>
        `
    };
    pageContent.innerHTML = templates[pageId] || '<h2>Sayfa bulunamadı</h2>';
    loadPageData(pageId);
}
async function loadPageData(pageId) {
    if (pageId === 'anasayfa') {
        try {
            const response = await fetch('/api/anasayfa');
            const data = await response.json();
            document.getElementById('aktifKiralamalar').textContent = data.aktifKiralamalar;
            document.getElementById('toplamArac').textContent = data.toplamArac;
            document.getElementById('toplamMusteri').textContent = data.toplamMusteri;
            document.getElementById('aylikGelir').textContent = 
                data.aylikCiro.toLocaleString('tr-TR') + ' ₺';
            const aracDurumlariCtx = document.getElementById('aracDurumlariGrafik');
            if (aracDurumlariCtx) {
                if (window.aracDurumlariChart) {
                    window.aracDurumlariChart.destroy();
                }

                window.aracDurumlariChart = new Chart(aracDurumlariCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Müsait', 'Kirada', 'Bakımda'],
                        datasets: [{
                            data: [data.musaitArac, data.kiradaArac, data.bakimdaArac],
                            backgroundColor: [
                                chartColors.success,
                                chartColors.primary,
                                chartColors.danger
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
            const kiralamalarCtx = document.getElementById('kiralamalarGrafik');
            if (kiralamalarCtx) {
                if (window.kiralamalarChart) {
                    window.kiralamalarChart.destroy();
                }

                const aylikKiralamalar = data.aylikKiralamalar || [];
                console.log('Aylık Kiralamalar:', aylikKiralamalar);

                window.kiralamalarChart = new Chart(kiralamalarCtx, {
                    type: 'line',
                    data: {
                        labels: aylikKiralamalar.map(k => {
                            const [yil, ay] = k.ay.split('-');
                            return new Date(yil, ay - 1).toLocaleDateString('tr-TR', { 
                                month: 'long', 
                                year: 'numeric' 
                            });
                        }),
                        datasets: [{
                            label: 'Kiralama Sayısı',
                            data: aylikKiralamalar.map(k => k.sayi),
                            borderColor: chartColors.primary,
                            backgroundColor: `${chartColors.primary}20`,
                            fill: true,
                            tension: 0.4,
                            yAxisID: 'y'
                        }, {
                            label: 'Ciro (₺)',
                            data: aylikKiralamalar.map(k => k.ciro),
                            borderColor: chartColors.info,
                            backgroundColor: `${chartColors.info}20`,
                            fill: true,
                            tension: 0.4,
                            yAxisID: 'y1'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Son 6 Ay Kiralama İstatistikleri'
                            }
                        },
                        scales: {
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                title: {
                                    display: true,
                                    text: 'Kiralama Sayısı'
                                }
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                title: {
                                    display: true,
                                    text: 'Ciro (₺)'
                                },
                                grid: {
                                    drawOnChartArea: false
                                }
                            }
                        }
                    }
                });
            }
            const sonKiralamalarTablo = document.getElementById('sonKiralamalarTablo');
            if (sonKiralamalarTablo) {
                console.log('Son Kiralamalar:', data.sonKiralamalar);

                if (data.sonKiralamalar && data.sonKiralamalar.length > 0) {
                    sonKiralamalarTablo.innerHTML = data.sonKiralamalar.map(k => `
                        <tr>
                            <td>${k.ad} ${k.soyad}</td>
                            <td>${k.marka} ${k.model} (${k.plaka})</td>
                            <td>${new Date(k.baslangic_tarihi).toLocaleDateString('tr-TR')}</td>
                            <td>${parseFloat(k.toplam_ucret).toLocaleString('tr-TR')} ₺</td>
                            <td>
                                <span class="badge bg-${k.durum === 'Aktif' ? 'success' : 'secondary'}">
                                    ${k.durum}
                                </span>
                            </td>
                        </tr>
                    `).join('');
                } else {
                    sonKiralamalarTablo.innerHTML = `
                        <tr>
                            <td colspan="5" class="text-center">Henüz kiralama kaydı bulunmuyor</td>
                        </tr>
                    `;
                }
            }
            const araclarResponse = await fetch('/api/araclar');
            const araclar = await araclarResponse.json();
            const aracFiltresi = document.getElementById('aracFiltresi');
            if (aracFiltresi) {
                aracFiltresi.innerHTML = araclar.map(arac => `
                    <option value="${arac.id}">${arac.marka} ${arac.model} (${arac.plaka})</option>
                `).join('');
                $(aracFiltresi).select2({
                    placeholder: 'Araç seçin',
                    allowClear: true
                });
            }
            await loadAracPerformansGrafik();
            ['performansMetrigi', 'aracFiltresi', 'tarihAraligi'].forEach(id => {
                document.getElementById(id)?.addEventListener('change', loadAracPerformansGrafik);
            });
            await updateAracFiltresi();
        } catch (error) {
            console.error('Veri yükleme hatası:', error);
        }
    } else if (pageId === 'araclar') {
        try {
                const araclar = await fetch('/api/araclar').then(r => r.json());
                document.getElementById('araclarContainer').innerHTML = araclar.map(arac => `
                    <div class="col-md-4 col-lg-3 mb-4">
                        <div class="arac-card">
                            <div class="arac-image" onclick="showAracDetay(${arac.id})">
                                ${arac.foto 
                                    ? `<img src="/uploads/${arac.foto}" alt="${arac.marka} ${arac.model}" class="arac-foto">` 
                                    : `<i class="fas fa-car"></i>`
                                }
                                <span class="arac-durum-badge badge bg-${getDurumClass(arac.durum)}">${arac.durum || 'Müsait'}</span>
                            </div>
                            <div class="arac-info">
                                <h5>${arac.marka} ${arac.model}</h5>
                                <p class="plaka">${arac.plaka}</p>
                                <div class="arac-fiyat mb-3">
                                    <strong>${arac.gunluk_ucret ? arac.gunluk_ucret + ' ₺/gün' : 'Fiyat Belirtilmedi'}</strong>
                                </div>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-primary btn-sm w-50" onclick="showBakimGecmisi(${arac.id})">
                                        <i class="fas fa-tools"></i> Bakım
                                    </button>
                                    <button class="btn btn-warning btn-sm w-50" onclick="showHasarGecmisi(${arac.id})">
                                        <i class="fas fa-car-crash"></i> Hasar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
        } catch (error) {
            console.error('Araçlar yüklenirken hata:', error);
        }
    } else if (pageId === 'musteriler') {
        try {
                const musteriler = await fetch('/api/musteriler').then(r => r.json());
                document.getElementById('musterilerTablo').innerHTML = musteriler.map(musteri => `
                    <tr>
                        <td>${musteri.id}</td>
                        <td>${musteri.ad}</td>
                        <td>${musteri.soyad}</td>
                        <td>${musteri.tc_no || '-'}</td>
                        <td>${musteri.telefon || '-'}</td>
                        <td>${musteri.email || '-'}</td>
                        <td><span class="badge bg-info">${getEhliyetSinifiAciklama(musteri.ehliyet_sinifi)}</span></td>
                        <td>${musteri.adres || '-'}</td>
                        <td>${getActionButtons(musteri.id, 'Musteri')}</td>
                    </tr>
                `).join('');
        } catch (error) {
            console.error('Müşteriler yüklenirken hata:', error);
        }
    } else if (pageId === 'kiralamalar') {
        try {
                const kiralamalar = await fetch('/api/kiralamalar').then(r => r.json());
                document.getElementById('kiralamalarTablo').innerHTML = kiralamalar.map(kiralama => `
                    <tr>
                        <td>${kiralama.id}</td>
                    <td class="text-nowrap">${kiralama.musteri_ad} ${kiralama.musteri_soyad}</td>
                    <td class="text-nowrap">${kiralama.marka} ${kiralama.model}<br><small>(${kiralama.plaka})</small></td>
                    <td class="text-nowrap">${new Date(kiralama.baslangic_tarihi).toLocaleDateString('tr-TR')}</td>
                    <td class="text-nowrap">${kiralama.bitis_tarihi ? new Date(kiralama.bitis_tarihi).toLocaleDateString('tr-TR') : '-'}</td>
                        <td>${kiralama.toplam_gun || '-'}</td>
                    <td class="text-nowrap">${kiralama.gunluk_ucret ? kiralama.gunluk_ucret + ' ₺' : '-'}</td>
                    <td class="text-nowrap">${kiralama.toplam_ucret ? kiralama.toplam_ucret + ' ₺' : '-'}</td>
                    <td class="text-nowrap">${kiralama.alis_km || '-'} / ${kiralama.teslim_km || '-'}</td>
                        <td><span class="badge bg-${getOdemeDurumClass(kiralama.odeme_durumu)}">${kiralama.odeme_durumu || 'Bekliyor'}</span></td>
                        <td><span class="badge bg-${getKiralamaDurumClass(kiralama.durum)}">${kiralama.durum || 'Aktif'}</span></td>
                    <td class="text-nowrap">${kiralama.calisan_ad} ${kiralama.calisan_soyad}</td>
                        <td>
                        <div class="btn-group btn-group-sm">
                                ${kiralama.durum === 'Aktif' ? `
                                <button class="btn btn-success" onclick="showTeslimModal(${kiralama.id})" title="Teslim Al">
                                    <i class="fas fa-check"></i>
                                    </button>
                                ` : ''}
                            <button class="btn btn-warning" onclick="editKiralama(${kiralama.id})" title="Düzenle">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
        } catch (error) {
            console.error('Kiralamalar yüklenirken hata:', error);
        }
    } else if (pageId === 'calisanlar') {
        try {
            const calisanlar = await fetch('/api/calisanlar').then(r => r.json());
            document.getElementById('calisanlarTablo').innerHTML = calisanlar.map(calisan => `
                <tr>
                    <td>${calisan.id}</td>
                    <td>${calisan.ad}</td>
                    <td>${calisan.soyad}</td>
                    <td>${calisan.tc_no || '-'}</td>
                    <td>${calisan.telefon || '-'}</td>
                    <td>${calisan.email || '-'}</td>
                    <td>${calisan.pozisyon || '-'}</td>
                    <td>${calisan.maas ? calisan.maas + ' ₺' : '-'}</td>
                    <td><span class="badge bg-${getCalisanDurumClass(calisan.durum)}">${calisan.durum || 'Aktif'}</span></td>
                    <td>${getActionButtons(calisan.id, 'Calisan')}</td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Çalışanlar yüklenirken hata:', error);
        }
    }
}
function getDurumClass(durum) {
    switch(durum) {
        case 'Müsait': return 'success';
        case 'Kirada': return 'warning';
        case 'Bakımda': return 'danger';
        default: return 'secondary';
    }
}

function getOdemeDurumClass(durum) {
    switch(durum) {
        case 'Ödendi': return 'success';
        case 'Bekliyor': return 'warning';
        case 'İptal': return 'danger';
        default: return 'secondary';
    }
}

function getKiralamaDurumClass(durum) {
    switch(durum) {
        case 'Aktif': return 'success';
        case 'Tamamlandı': return 'info';
        case 'İptal': return 'danger';
        default: return 'secondary';
    }
}

function getCalisanDurumClass(durum) {
    switch(durum) {
        case 'Aktif': return 'success';
        case 'Pasif': return 'danger';
        case 'İzinli': return 'warning';
        default: return 'secondary';
    }
}
function getActionButtons(id, type) {
    return `
        <div class="action-buttons">
            <button class="btn btn-warning" onclick="edit${type}(${id})" title="Düzenle">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger" onclick="delete${type}(${id})" title="Sil">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
}
async function showAracDetay(id) {
    try {
        const arac = await fetch(`/api/araclar/${id}`).then(r => r.json());
        
        const modal = `
            <div class="modal fade arac-detay-modal" id="aracDetayModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${arac.marka} ${arac.model}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <!-- Fotoğraf Alanı -->
                            <div class="arac-detay-foto mb-4">
                                ${arac.foto 
                                    ? `<img src="/uploads/${arac.foto}" alt="${arac.marka} ${arac.model}">`
                                    : `<div class="no-photo"><i class="fas fa-car"></i></div>`
                                }
                            </div>

                            <!-- Bilgi Grid'i -->
                            <div class="arac-detay-grid">
                                <div class="arac-detay-item">
                                    <label>Plaka</label>
                                    <p>${arac.plaka}</p>
                                </div>
                                <div class="arac-detay-item">
                                    <label>Model Yılı</label>
                                    <p>${arac.yil}</p>
                                </div>
                                <div class="arac-detay-item">
                                    <label>Yakıt Tipi</label>
                                    <p>${arac.yakit || '-'}</p>
                                </div>
                                <div class="arac-detay-item">
                                    <label>Vites</label>
                                    <p>${arac.vites || '-'}</p>
                                </div>
                                <div class="arac-detay-item">
                                    <label>Renk</label>
                                    <p>${arac.renk || '-'}</p>
                                </div>
                                <div class="arac-detay-item">
                                    <label>Kilometre</label>
                                    <p>${arac.km?.toLocaleString('tr-TR')} km</p>
                                </div>
                                <div class="arac-detay-item">
                                    <label>Günlük Ücret</label>
                                    <p>${arac.gunluk_ucret?.toLocaleString('tr-TR')} ₺</p>
                                </div>
                                <div class="arac-detay-item">
                                    <label>Durum</label>
                                    <p><span class="badge bg-${getDurumClass(arac.durum)}">${arac.durum || 'Müsait'}</span></p>
                                </div>
                            </div>

                            <!-- İşlem Butonları -->
                            <div class="d-flex justify-content-end gap-2 mt-4">
                                <button class="btn btn-warning" onclick="editArac(${arac.id})">
                                    <i class="fas fa-edit"></i> Düzenle
                                </button>
                                <button class="btn btn-danger" onclick="deleteArac(${arac.id})">
                                    <i class="fas fa-trash"></i> Sil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modal);
        const modalElement = new bootstrap.Modal(document.getElementById('aracDetayModal'));
        modalElement.show();
        
        document.getElementById('aracDetayModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
    } catch (error) {
        console.error('Araç detay yükleme hatası:', error);
        alert('Araç bilgileri yüklenirken bir hata oluştu');
    }
}
function getBakimDurumClass(durum) {
    switch (durum) {
        case 'Beklemede': return 'warning';
        case 'Devam Ediyor': return 'info';
        case 'Tamamlandı': return 'success';
        default: return 'secondary';
    }
}

function getHasarDurumClass(durum) {
    switch(durum) {
        case 'Onarıldı': return 'success';
        case 'Onarımda': return 'warning';
        case 'Beklemede': return 'info';
        default: return 'secondary';
    }
}
async function showAracModal(id = null) {
    const arac = id ? await fetch(`/api/araclar/${id}`).then(r => r.json()) : {};
    
    const modal = `
        <div class="modal fade" id="aracModal" tabindex="-1">
            <div class="modal-dialog modal-lg"> <!-- modal-lg ekledik -->
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${id ? 'Aracı Düzenle' : 'Yeni Araç Ekle'}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <form id="aracForm" onsubmit="saveArac(event)">
                        <div class="modal-body">
                            <div class="row">
                                <!-- Sol Kolon -->
                                <div class="col-md-6">
                                    <input type="hidden" name="id" value="${arac.id || ''}">
                                    <div class="mb-3">
                                        <label class="form-label">Marka</label>
                                        <input type="text" class="form-control" name="marka" value="${arac.marka || ''}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Model</label>
                                        <input type="text" class="form-control" name="model" value="${arac.model || ''}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Yıl</label>
                                        <input type="number" class="form-control" name="yil" value="${arac.yil || ''}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Plaka</label>
                                        <input type="text" class="form-control" name="plaka" value="${arac.plaka || ''}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Renk</label>
                                        <input type="text" class="form-control" name="renk" value="${arac.renk || ''}" required>
                                    </div>
                                </div>
                                <!-- Sağ Kolon -->
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Vites</label>
                                        <select class="form-control" name="vites" required>
                                            <option value="">Seçiniz</option>
                                            <option value="Manuel" ${arac.vites === 'Manuel' ? 'selected' : ''}>Manuel</option>
                                            <option value="Otomatik" ${arac.vites === 'Otomatik' ? 'selected' : ''}>Otomatik</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Yakıt</label>
                                        <select class="form-control" name="yakit" required>
                                            <option value="">Seçiniz</option>
                                            <option value="Benzin" ${arac.yakit === 'Benzin' ? 'selected' : ''}>Benzin</option>
                                            <option value="Dizel" ${arac.yakit === 'Dizel' ? 'selected' : ''}>Dizel</option>
                                            <option value="LPG" ${arac.yakit === 'LPG' ? 'selected' : ''}>LPG</option>
                                            <option value="Elektrik" ${arac.yakit === 'Elektrik' ? 'selected' : ''}>Elektrik</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Günlük Ücret</label>
                                        <input type="number" class="form-control" name="gunluk_ucret" value="${arac.gunluk_ucret || ''}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Durum</label>
                                        <select class="form-control" name="durum" required>
                                            <option value="Müsait" ${arac.durum === 'Müsait' ? 'selected' : ''}>Müsait</option>
                                            <option value="Kirada" ${arac.durum === 'Kirada' ? 'selected' : ''}>Kirada</option>
                                            <option value="Bakımda" ${arac.durum === 'Bakımda' ? 'selected' : ''}>Bakımda</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Araç Fotoğrafı</label>
                                        <input type="file" class="form-control" name="foto" onchange="previewAracFoto(this)">
                                        <div class="current-photo mt-2 ${arac.foto ? '' : 'no-photo'}">
                                            ${arac.foto ? 
                                                `<img src="/uploads/${arac.foto}" alt="Araç Fotoğrafı" style="max-width: 100%; height: auto;">` : 
                                                '<i class="fas fa-car"></i>'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                            <button type="submit" class="btn btn-primary">Kaydet</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    const existingModal = document.getElementById('aracModal');
    if (existingModal) {
        existingModal.remove();
    }
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalElement = document.getElementById('aracModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
}
function previewAracFoto(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoArea = document.querySelector('.current-photo');
            photoArea.innerHTML = `<img src="${e.target.result}" alt="Araç Fotoğrafı">`;
            photoArea.classList.remove('no-photo');
        }
        reader.readAsDataURL(input.files[0]);
    }
}
async function saveArac(event) {
    event.preventDefault();
    const form = document.getElementById('aracForm');
    const formData = new FormData(form);
    const id = formData.get('id');
    const url = id ? `/api/araclar/${id}` : '/api/araclar';
    const method = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'İşlem başarısız');
        }

        await response.json();
        bootstrap.Modal.getInstance(document.getElementById('aracModal')).hide();
        await showPage('araclar');
        await updateAracFiltresi();
        if (document.getElementById('aracPerformansGrafik')) {
            await loadAracPerformansGrafik();
        }
    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu: ' + error.message);
    }
}

async function editArac(id) {
    showAracModal(id);
}

async function deleteArac(id) {
    if (confirm('Bu aracı silmek istediğinizden emin misiniz?')) {
        try {
            const response = await fetch(`/api/araclar/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                showPage('araclar');
            } else {
                throw new Error('Silme işlemi başarısız');
            }
        } catch (error) {
            alert('Bir hata oluştu: ' + error.message);
        }
    }
}
window.showMusteriModal = async function(id = null) {
    const musteri = id ? await fetch(`/api/musteriler/${id}`).then(r => r.json()) : {};
    
    const modal = `
        <div class="modal fade" id="musteriModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${id ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="musteriForm">
                            <input type="hidden" name="id" value="${id || ''}">
                            <div class="mb-3">
                                <label class="form-label">Ad</label>
                                <input type="text" class="form-control" name="ad" value="${musteri.ad || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Soyad</label>
                                <input type="text" class="form-control" name="soyad" value="${musteri.soyad || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">TC No</label>
                                <input type="text" class="form-control" name="tc_no" value="${musteri.tc_no || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Telefon</label>
                                <input type="tel" class="form-control" name="telefon" value="${musteri.telefon || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" name="email" value="${musteri.email || ''}">
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">Ehliyet Sınıfı</label>
                                <select class="form-control" name="ehliyet_sinifi" required>
                                    <option value="">Seçiniz</option>
                                    <option value="M" ${musteri.ehliyet_sinifi === 'M' ? 'selected' : ''}>M (Motorlu Bisiklet)</option>
                                    <option value="A1" ${musteri.ehliyet_sinifi === 'A1' ? 'selected' : ''}>A1 (Motosiklet)</option>
                                    <option value="A2" ${musteri.ehliyet_sinifi === 'A2' ? 'selected' : ''}>A2 (Motosiklet)</option>
                                    <option value="A" ${musteri.ehliyet_sinifi === 'A' ? 'selected' : ''}>A (Motosiklet)</option>
                                    <option value="B1" ${musteri.ehliyet_sinifi === 'B1' ? 'selected' : ''}>B1 (Dört Tekerlekli Motosiklet)</option>
                                    <option value="B" ${musteri.ehliyet_sinifi === 'B' ? 'selected' : ''}>B (Otomobil, Minibüs)</option>
                                    <option value="BE" ${musteri.ehliyet_sinifi === 'BE' ? 'selected' : ''}>BE (B + Römork)</option>
                                    <option value="C1" ${musteri.ehliyet_sinifi === 'C1' ? 'selected' : ''}>C1 (Kamyonet)</option>
                                    <option value="C1E" ${musteri.ehliyet_sinifi === 'C1E' ? 'selected' : ''}>C1E (C1 + Römork)</option>
                                    <option value="C" ${musteri.ehliyet_sinifi === 'C' ? 'selected' : ''}>C (Kamyon)</option>
                                    <option value="CE" ${musteri.ehliyet_sinifi === 'CE' ? 'selected' : ''}>CE (C + Römork)</option>
                                    <option value="D1" ${musteri.ehliyet_sinifi === 'D1' ? 'selected' : ''}>D1 (Minibüs)</option>
                                    <option value="D1E" ${musteri.ehliyet_sinifi === 'D1E' ? 'selected' : ''}>D1E (D1 + Römork)</option>
                                    <option value="D" ${musteri.ehliyet_sinifi === 'D' ? 'selected' : ''}>D (Otobüs)</option>
                                    <option value="DE" ${musteri.ehliyet_sinifi === 'DE' ? 'selected' : ''}>DE (D + Römork)</option>
                                    <option value="F" ${musteri.ehliyet_sinifi === 'F' ? 'selected' : ''}>F (Traktör)</option>
                                    <option value="G" ${musteri.ehliyet_sinifi === 'G' ? 'selected' : ''}>G (İş Makinesi)</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Adres</label>
                                <textarea class="form-control" name="adres" rows="3">${musteri.adres || ''}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                        <button type="button" class="btn btn-primary" onclick="saveMusteri()">Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalElement = new bootstrap.Modal(document.getElementById('musteriModal'));
    modalElement.show();
    
    document.getElementById('musteriModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
};

window.saveMusteri = async function() {
    try {
        const form = document.getElementById('musteriForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const id = data.id;

        const url = id ? `/api/musteriler/${id}` : '/api/musteriler';
        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'İşlem başarısız');
        }

        await response.json();

        bootstrap.Modal.getInstance(document.getElementById('musteriModal')).hide();
        showPage('musteriler');
    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu: ' + error.message);
    }
};

window.editMusteri = async function(id) {
    showMusteriModal(id);
};

window.deleteMusteri = async function(id) {
    if (confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) {
        try {
            const response = await fetch(`/api/musteriler/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Silme işlemi başarısız');
            }
            
            showPage('musteriler');
        } catch (error) {
            console.error('Hata:', error);
            alert('Bir hata oluştu: ' + error.message);
        }
    }
};
function getEhliyetSinifiAciklama(sinif) {
    const ehliyetSiniflari = {
        'M': 'M (Motorlu Bisiklet)',
        'A1': 'A1 (Motosiklet)',
        'A2': 'A2 (Motosiklet)',
        'A': 'A (Motosiklet)',
        'B1': 'B1 (Dört Tekerlekli Motosiklet)',
        'B': 'B (Otomobil, Minibüs)',
        'BE': 'BE (B + Römork)',
        'C1': 'C1 (Kamyonet)',
        'C1E': 'C1E (C1 + Römork)',
        'C': 'C (Kamyon)',
        'CE': 'CE (C + Römork)',
        'D1': 'D1 (Minibüs)',
        'D1E': 'D1E (D1 + Römork)',
        'D': 'D (Otobüs)',
        'DE': 'DE (D + Römork)',
        'F': 'F (Traktör)',
        'G': 'G (İş Makinesi)'
    };
    
    return ehliyetSiniflari[sinif] || sinif || '-';
}
window.showKiralamaModal = async function(id = null) {
    const [musteriler, araclar, calisanlar] = await Promise.all([
        fetch('/api/musteriler').then(r => r.json()),
        fetch('/api/araclar').then(r => r.json()),
        fetch('/api/calisanlar').then(r => r.json())
    ]);

    const kiralama = id ? await fetch(`/api/kiralamalar/${id}`).then(r => r.json()) : {};
    
    const modal = `
        <div class="modal fade" id="kiralamaModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${id ? 'Kiralama Düzenle' : 'Yeni Kiralama'}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="kiralamaForm">
                            <input type="hidden" name="id" value="${id || ''}">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Müşteri</label>
                                        <select class="form-control" name="musteri_id" required>
                                            <option value="">Müşteri Seçin</option>
                                            ${musteriler.map(m => `
                                                <option value="${m.id}" ${kiralama.musteri_id == m.id ? 'selected' : ''}>
                                                    ${m.ad} ${m.soyad} - ${m.telefon}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Araç</label>
                                        <select class="form-control" name="arac_id" required onchange="updateGunlukUcret(this)">
                                            <option value="">Araç Seçin</option>
                                            ${araclar.filter(a => a.durum === 'Müsait' || a.id === kiralama.arac_id).map(a => `
                                                <option value="${a.id}" 
                                                    data-ucret="${a.gunluk_ucret}"
                                                    ${kiralama.arac_id == a.id ? 'selected' : ''}>
                                                    ${a.marka} ${a.model} - ${a.plaka} (${a.gunluk_ucret}₺/gün)
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Satış Temsilcisi</label>
                                        <select class="form-control" name="calisan_id" required>
                                            <option value="">Satış Temsilcisi Seçin</option>
                                            ${calisanlar
                                                .filter(c => c.pozisyon === 'Satış Temsilcisi')
                                                .map(c => `
                                                    <option value="${c.id}" ${kiralama.calisan_id == c.id ? 'selected' : ''}>
                                                        ${c.ad} ${c.soyad}
                                                    </option>
                                                `).join('')}
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Başlangıç Tarihi</label>
                                        <input type="date" class="form-control" name="baslangic_tarihi" 
                                            value="${kiralama.baslangic_tarihi || ''}" 
                                            onchange="hesaplaToplamUcret()" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Bitiş Tarihi</label>
                                        <input type="date" class="form-control" name="bitis_tarihi" 
                                            value="${kiralama.bitis_tarihi || ''}" 
                                            onchange="hesaplaToplamUcret()" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Günlük Ücret (₺)</label>
                                        <input type="number" class="form-control" name="gunluk_ucret" 
                                            value="${kiralama.gunluk_ucret || ''}" readonly>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Toplam Gün</label>
                                        <input type="number" class="form-control" name="toplam_gun" 
                                            value="${kiralama.toplam_gun || ''}" readonly>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Toplam Ücret (₺)</label>
                                        <input type="number" class="form-control" name="toplam_ucret" 
                                            value="${kiralama.toplam_ucret || ''}" readonly>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                        <button type="button" class="btn btn-primary" onclick="saveKiralama()">Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalElement = new bootstrap.Modal(document.getElementById('kiralamaModal'));
    modalElement.show();
    
    document.getElementById('kiralamaModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
};
function updateGunlukUcret(select) {
    const ucret = select.options[select.selectedIndex]?.dataset.ucret || '';
    document.querySelector('input[name="gunluk_ucret"]').value = ucret;
    hesaplaToplamUcret();
}
function hesaplaToplamUcret() {
    const baslangic = new Date(document.querySelector('input[name="baslangic_tarihi"]').value);
    const bitis = new Date(document.querySelector('input[name="bitis_tarihi"]').value);
    const gunlukUcret = parseFloat(document.querySelector('input[name="gunluk_ucret"]').value) || 0;
    
    if (baslangic && bitis && !isNaN(baslangic) && !isNaN(bitis)) {
        const gunFarki = Math.ceil((bitis - baslangic) / (1000 * 60 * 60 * 24));
        if (gunFarki > 0) {
            document.querySelector('input[name="toplam_gun"]').value = gunFarki;
            document.querySelector('input[name="toplam_ucret"]').value = gunFarki * gunlukUcret;
        }
    }
}
window.saveKiralama = async function() {
    try {
        const form = document.getElementById('kiralamaForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const id = data.id;
        const baslangic = new Date(data.baslangic_tarihi);
        const bitis = new Date(data.bitis_tarihi);
        if (bitis <= baslangic) {
            throw new Error('Bitiş tarihi başlangıç tarihinden sonra olmalıdır');
        }

        const url = id ? `/api/kiralamalar/${id}` : '/api/kiralamalar';
        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                musteri_id: data.musteri_id,
                arac_id: data.arac_id,
                baslangic_tarihi: data.baslangic_tarihi,
                bitis_tarihi: data.bitis_tarihi,
                gunluk_ucret: data.gunluk_ucret,
                toplam_gun: data.toplam_gun,
                toplam_ucret: data.toplam_ucret,
                durum: data.durum || 'Aktif',
                odeme_durumu: data.odeme_durumu || 'Bekliyor'
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'İşlem başarısız');
        }

        await response.json();
        bootstrap.Modal.getInstance(document.getElementById('kiralamaModal')).hide();
        showPage('kiralamalar');
    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata olutu: ' + error.message);
    }
};
window.deleteKiralama = async function(id) {
    if (confirm('Bu kiralamayı silmek istediğinizden emin misiniz?')) {
        try {
            const response = await fetch(`/api/kiralamalar/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Silme işlemi başarısız');
            }
            
            showPage('kiralamalar');
        } catch (error) {
            console.error('Hata:', error);
            alert('Bir hata oluştu: ' + error.message);
        }
    }
};
window.showTeslimModal = async function(kiralamaId) {
    const kiralama = await fetch(`/api/kiralamalar/${kiralamaId}`).then(r => r.json());
    
    const modal = `
        <div class="modal fade" id="teslimModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Araç Teslim Al</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="teslimForm">
                            <input type="hidden" name="kiralama_id" value="${kiralamaId}">
                            <input type="hidden" name="alis_km" value="${kiralama.alis_km}">
                            <div class="mb-3">
                                <label class="form-label">Araç</label>
                                <input type="text" class="form-control" value="${kiralama.marka} ${kiralama.model} (${kiralama.plaka})" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Alış KM</label>
                                <input type="number" class="form-control" value="${kiralama.alis_km}" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Teslim KM</label>
                                <input type="number" class="form-control" name="teslim_km" min="${kiralama.alis_km + 1}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Teslim Tarihi</label>
                                <input type="datetime-local" class="form-control" name="teslim_tarihi" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Hasar Durumu</label>
                                <select class="form-control" name="hasar_durumu" onchange="toggleHasarDetay(this.value)">
                                    <option value="yok">Hasar Yok</option>
                                    <option value="var">Hasar Var</option>
                                </select>
                            </div>
                            <div id="hasarDetay" style="display: none;">
                                <div class="mb-3">
                                    <label class="form-label">Hasar Türü</label>
                                    <select class="form-control" name="hasar_turu">
                                        <option value="">Seçiniz</option>
                                        <option value="Kaza">Kaza</option>
                                        <option value="Çizik">Çizik</option>
                                        <option value="Göçük">Göçük</option>
                                        <option value="Cam/Far">Cam/Far</option>
                                        <option value="Diğer">Diğer</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Hasar Açıklaması</label>
                                    <textarea class="form-control" name="hasar_aciklama" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Tahmini Hasar Ücreti (₺)</label>
                                    <input type="number" class="form-control" name="hasar_ucret" min="0">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Ödeme Durumu</label>
                                <select class="form-control" name="odeme_durumu" required>
                                    <option value="Ödendi">Ödendi</option>
                                    <option value="Bekliyor">Bekliyor</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                        <button type="button" class="btn btn-primary" onclick="teslimAl()">Teslim Al</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalElement = new bootstrap.Modal(document.getElementById('teslimModal'));
    modalElement.show();
    document.querySelector('input[name="teslim_tarihi"]').value = new Date().toISOString().slice(0, 16);
    
    document.getElementById('teslimModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
};
function toggleHasarDetay(value) {
    const hasarDetay = document.getElementById('hasarDetay');
    hasarDetay.style.display = value === 'var' ? 'block' : 'none';
    if (value === 'yok') {
        const form = document.getElementById('teslimForm');
        form.querySelector('[name="hasar_turu"]').value = '';
        form.querySelector('[name="hasar_aciklama"]').value = '';
        form.querySelector('[name="hasar_ucret"]').value = '';
    }
}
async function teslimAl() {
    try {
        const form = document.getElementById('teslimForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const alis_km = parseInt(document.querySelector('input[value^="' + data.alis_km + '"]').value);
        const teslim_km = parseInt(data.teslim_km);
        
        if (isNaN(teslim_km) || teslim_km <= alis_km) {
            throw new Error(`Teslim kilometresi (${teslim_km}) alış kilometresinden (${alis_km}) küçük olamaz`);
        }
        if (data.hasar_durumu === 'var') {
            if (!data.hasar_turu) {
                throw new Error('Lütfen hasar türünü seçin');
            }
            if (!data.hasar_aciklama) {
                throw new Error('Lütfen hasar açıklaması girin');
            }
            if (!data.hasar_ucret) {
                throw new Error('Lütfen tahmini hasar ücretini girin');
            }
        }

        const response = await fetch(`/api/kiralamalar/${data.kiralama_id}/teslim`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teslim_km: teslim_km,
                teslim_tarihi: data.teslim_tarihi,
                odeme_durumu: data.odeme_durumu,
                hasar_durumu: data.hasar_durumu,
                hasar_turu: data.hasar_durumu === 'var' ? data.hasar_turu : null,
                hasar_aciklama: data.hasar_durumu === 'var' ? data.hasar_aciklama : null,
                hasar_ucret: data.hasar_durumu === 'var' ? parseFloat(data.hasar_ucret) : null
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'İşlem başarısız');
        }

        const result = await response.json();
        if (result.durum_mesaji) {
            let mesaj = result.durum_mesaji + '\n' + 
                  `Toplam gün: ${result.gercek_gun}\n` +
                  `Toplam ücret: ${result.toplam_ucret} ₺\n` +
                       `Toplam km: ${result.km_fark} km`;
            
            if (data.hasar_durumu === 'var') {
                mesaj += '\n\nHasar kaydı oluşturuldu!';
            }
            
            alert(mesaj);
        }

        bootstrap.Modal.getInstance(document.getElementById('teslimModal')).hide();
        showPage('kiralamalar');
    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu: ' + error.message);
    }
}
window.editKiralama = async function(id) {
    try {
        const kiralama = await fetch(`/api/kiralamalar/${id}`).then(r => r.json());
        showKiralamaModal(id);
    } catch (error) {
        console.error('Kiralama yükleme hatası:', error);
        alert('Kiralama bilgileri yüklenirken bir hata oluştu');
    }
};
window.showCalisanModal = async function(id = null) {
    const calisan = id ? await fetch(`/api/calisanlar/${id}`).then(r => r.json()) : {};
    
    const modal = `
        <div class="modal fade" id="calisanModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${id ? 'Çalışan Düzenle' : 'Yeni Çalışan Ekle'}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="calisanForm">
                            <input type="hidden" name="id" value="${id || ''}">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Ad</label>
                                        <input type="text" class="form-control" name="ad" value="${calisan.ad || ''}" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Soyad</label>
                                        <input type="text" class="form-control" name="soyad" value="${calisan.soyad || ''}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">TC No</label>
                                <input type="text" class="form-control" name="tc_no" value="${calisan.tc_no || ''}" required>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Telefon</label>
                                        <input type="tel" class="form-control" name="telefon" value="${calisan.telefon || ''}" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Email</label>
                                        <input type="email" class="form-control" name="email" value="${calisan.email || ''}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Pozisyon</label>
                                        <select class="form-control" name="pozisyon" required>
                                            <option value="">Seçiniz</option>
                                            <option value="Yönetici" ${calisan.pozisyon === 'Yönetici' ? 'selected' : ''}>Yönetici</option>
                                            <option value="Satış Temsilcisi" ${calisan.pozisyon === 'Satış Temsilcisi' ? 'selected' : ''}>Satış Temsilcisi</option>
                                            <option value="Teknisyen" ${calisan.pozisyon === 'Teknisyen' ? 'selected' : ''}>Teknisyen</option>
                                            <option value="Muhasebeci" ${calisan.pozisyon === 'Muhasebeci' ? 'selected' : ''}>Muhasebeci</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Maaş</label>
                                        <input type="number" class="form-control" name="maas" value="${calisan.maas || ''}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">İşe Başlama Tarihi</label>
                                        <input type="date" class="form-control" name="ise_baslama_tarihi" 
                                            value="${calisan.ise_baslama_tarihi ? calisan.ise_baslama_tarihi.split('T')[0] : ''}" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Durum</label>
                                        <select class="form-control" name="durum">
                                            <option value="Aktif" ${calisan.durum === 'Aktif' ? 'selected' : ''}>Aktif</option>
                                            <option value="Pasif" ${calisan.durum === 'Pasif' ? 'selected' : ''}>Pasif</option>
                                            <option value="İzinli" ${calisan.durum === 'İzinli' ? 'selected' : ''}>İzinli</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                        <button type="button" class="btn btn-primary" onclick="saveCalisan()">Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalElement = new bootstrap.Modal(document.getElementById('calisanModal'));
    modalElement.show();
    
    document.getElementById('calisanModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
};
window.saveCalisan = async function() {
    try {
        const form = document.getElementById('calisanForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const id = data.id;

        const url = id ? `/api/calisanlar/${id}` : '/api/calisanlar';
        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'İşlem başarısız');
        }

        await response.json();
        bootstrap.Modal.getInstance(document.getElementById('calisanModal')).hide();
        showPage('calisanlar');
    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu: ' + error.message);
    }
};
window.editCalisan = async function(id) {
    try {
        const calisan = await fetch(`/api/calisanlar/${id}`).then(r => r.json());
        showCalisanModal(id);
    } catch (error) {
        console.error('Çalışan yükleme hatası:', error);
        alert('Çalışan bilgileri yüklenirken bir hata oluştu');
    }
};
window.deleteCalisan = async function(id) {
    if (confirm('Bu çalışanı silmek istediğinizden emin misiniz?')) {
        try {
            const response = await fetch(`/api/calisanlar/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Silme işlemi başarısız');
            }
            
            showPage('calisanlar');
        } catch (error) {
            console.error('Hata:', error);
            alert('Bir hata oluştu: ' + error.message);
        }
    }
};
window.showBakimModal = async function(aracId, bakimTuru, mevcutBakim = null) {
    const arac = await fetch(`/api/araclar/${aracId}`).then(r => r.json());
    
    const modal = `
        <div class="modal fade" id="bakimModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${mevcutBakim ? 'Bakım Düzenle' : (bakimTuru === 'Yapılan' ? 'Yapılan Bakım Ekle' : 'Bakım Planla')}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="bakimForm">
                            <input type="hidden" name="arac_id" value="${aracId}">
                            <input type="hidden" name="id" value="${mevcutBakim?.id || ''}">
                            <input type="hidden" name="bakim_turu" value="${bakimTuru}">
                            
                            <div class="mb-3">
                                <label class="form-label">Araç Bilgisi</label>
                                <input type="text" class="form-control" value="${arac.marka} ${arac.model} (${arac.plaka})" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Mevcut KM</label>
                                <input type="number" class="form-control" value="${arac.km}" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Bakım İşlemi</label>
                                <select class="form-select" name="bakim_islem" required>
                                    <option value="">Seçiniz</option>
                                    <option value="Periyodik Bakım">Periyodik Bakım</option>
                                    <option value="Motor Bakımı">Motor Bakımı</option>
                                    <option value="Fren Sistemi">Fren Sistemi</option>
                                    <option value="Lastik Değişimi">Lastik Değişimi</option>
                                    <option value="Yağ Değişimi">Yağ Değişimi</option>
                                    <option value="Genel Kontrol">Genel Kontrol</option>
                                </select>
                            </div>
                            ${bakimTuru === 'Planlanan' ? `
                                <div class="mb-3">
                                    <label class="form-label">Planlanan KM</label>
                                    <input type="number" class="form-control" name="planlanan_km" 
                                        min="${arac.km}" 
                                        value="${mevcutBakim?.planlanan_km || arac.km + 10000}"
                                        required>
                                    <small class="text-muted">Bir sonraki bakım için planlanan kilometre</small>
                                </div>
                            ` : `
                                <div class="mb-3">
                                    <label class="form-label">Bakım Tarihi</label>
                                    <input type="date" class="form-control" name="bakim_tarihi" 
                                        value="${mevcutBakim?.bakim_tarihi?.split('T')[0] || new Date().toISOString().slice(0, 10)}" 
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Bakım Ücreti (₺)</label>
                                    <input type="number" class="form-control" name="bakim_ucret" 
                                        value="${mevcutBakim?.bakim_ucret || ''}" required>
                                </div>
                            `}
                            <div class="mb-3">
                                <label class="form-label">Açıklama</label>
                                <textarea class="form-control" name="aciklama" rows="3">${mevcutBakim?.aciklama || ''}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                        <button type="button" class="btn btn-primary" onclick="saveBakim()">Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalElement = new bootstrap.Modal(document.getElementById('bakimModal'));
    modalElement.show();
    
    document.getElementById('bakimModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
};
function getBakimTuruClass(tur) {
    switch(tur) {
        case 'Yapılan': return 'success';
        case 'Planlanan': return 'primary';
        default: return 'secondary';
    }
}
window.saveBakim = async function() {
    try {
        const form = document.getElementById('bakimForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const response = await fetch('/api/bakimlar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'İşlem başarısız');
        }

        await response.json();
        bootstrap.Modal.getInstance(document.getElementById('bakimModal')).hide();
        showAracDetay(data.arac_id);
    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu: ' + error.message);
    }
};
window.onaylaBakim = async function(bakimId) {
    if (confirm('Bu bakım planını onaylamak istediğinizden emin misiniz?')) {
        try {
            const bakimResponse = await fetch(`/api/bakimlar/${bakimId}`);
            const bakim = await bakimResponse.json();

            const response = await fetch(`/api/bakimlar/${bakimId}/onayla`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'İşlem başarısız');
            }
            const aracId = bakim.arac_id;
            const currentModal = document.getElementById('aracDetayModal');
            if (currentModal) {
                bootstrap.Modal.getInstance(currentModal).hide();
                setTimeout(() => showAracDetay(aracId), 500);
            }
        } catch (error) {
            console.error('Hata:', error);
            alert('Bir hata oluştu: ' + error.message);
        }
    }
};
window.deleteBakim = async function(bakimId) {
    if (confirm('Bu bakım kaydını silmek istediğinizden emin misiniz?')) {
        try {
            const bakimResponse = await fetch(`/api/bakimlar/${bakimId}`);
            const bakim = await bakimResponse.json();

            const response = await fetch(`/api/bakimlar/${bakimId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'İşlem başarısız');
            }
            const aracId = bakim.arac_id;
            const currentModal = document.getElementById('aracDetayModal');
            if (currentModal) {
                bootstrap.Modal.getInstance(currentModal).hide();
                setTimeout(() => showAracDetay(aracId), 500);
            }
        } catch (error) {
            console.error('Hata:', error);
            alert('Bir hata oluştu: ' + error.message);
        }
    }
};
window.editBakim = async function(bakimId) {
    try {
        const response = await fetch(`/api/bakimlar/${bakimId}`);
        if (!response.ok) {
            throw new Error('Bakım bilgileri alınamadı');
        }
        const bakim = await response.json();
        showBakimModal(bakim.arac_id, bakim.bakim_turu, bakim);
    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu: ' + error.message);
    }
};
window.showBakimGecmisi = async function(aracId) {
    try {
        const [arac, bakimlar] = await Promise.all([
            fetch(`/api/araclar/${aracId}`).then(r => r.json()),
            fetch(`/api/araclar/${aracId}/bakimlar`).then(r => r.json())
        ]);

        const modal = `
            <div class="modal fade" id="bakimGecmisiModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${arac.marka} ${arac.model} - Bakım Geçmişi</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h6 class="mb-0">Araç: ${arac.plaka}</h6>
                                    <small class="text-muted">Mevcut KM: ${arac.km?.toLocaleString('tr-TR')} km</small>
                                </div>
                                <div class="btn-group">
                                    <button class="btn btn-success btn-sm" onclick="showBakimModal(${arac.id}, 'Yapılan')">
                                        <i class="fas fa-check"></i> Yapılan Bakım
                                    </button>
                                    <button class="btn btn-primary btn-sm" onclick="showBakimModal(${arac.id}, 'Planlanan')">
                                        <i class="fas fa-clock"></i> Bakım Planla
                                    </button>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Tarih/Plan KM</th>
                                            <th>Tür</th>
                                            <th>İşlem</th>
                                            <th>Ücret</th>
                                            <th>Durum</th>
                                            <th>Açıklama</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${bakimlar.map(bakim => `
                                            <tr>
                                                <td>${bakim.bakim_turu === 'Planlanan' 
                                                    ? `${bakim.planlanan_km?.toLocaleString('tr-TR')} km`
                                                    : new Date(bakim.bakim_tarihi).toLocaleDateString('tr-TR')}</td>
                                                <td><span class="badge bg-${getBakimTuruClass(bakim.bakim_turu)}">${bakim.bakim_turu}</span></td>
                                                <td>${bakim.bakim_islem}</td>
                                                <td>${bakim.bakim_ucret ? bakim.bakim_ucret?.toLocaleString('tr-TR') + ' ₺' : '-'}</td>
                                                <td><span class="badge bg-${getBakimDurumClass(bakim.durum)}">${bakim.durum}</span></td>
                                                <td>${bakim.aciklama || '-'}</td>
                                                <td>
                                                    <div class="btn-group btn-group-sm">
                                                        ${bakim.bakim_turu === 'Planlanan' && bakim.durum !== 'Tamamlandı' ? `
                                                            <button class="btn btn-success" onclick="onaylaBakim(${bakim.id})" title="Bakımı Onayla">
                                                                <i class="fas fa-check"></i>
                                                            </button>
                                                        ` : ''}
                                                        <button class="btn btn-warning" onclick="editBakim(${bakim.id})" title="Düzenle">
                                                            <i class="fas fa-edit"></i>
                                                        </button>
                                                        <button class="btn btn-danger" onclick="deleteBakim(${bakim.id})" title="Sil">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        `).join('') || '<tr><td colspan="7" class="text-center">Bakım kaydı bulunamadı</td></tr>'}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modal);
        const modalElement = new bootstrap.Modal(document.getElementById('bakimGecmisiModal'));
        modalElement.show();

        document.getElementById('bakimGecmisiModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
    } catch (error) {
        console.error('Hata:', error);
        alert('Bakım geçmişi yüklenirken bir hata oluştu');
    }
};
window.showHasarGecmisi = async function(aracId) {
    try {
        const [arac, hasarlar] = await Promise.all([
            fetch(`/api/araclar/${aracId}`).then(r => r.json()),
            fetch(`/api/araclar/${aracId}/hasarlar`).then(r => r.json())
        ]);

        const modal = `
            <div class="modal fade" id="hasarGecmisiModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${arac.marka} ${arac.model} - Hasar Geçmişi</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-4">
                                <h6 class="mb-0">Araç: ${arac.plaka}</h6>
                                <small class="text-muted">Mevcut KM: ${arac.km?.toLocaleString('tr-TR')} km</small>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Tarih</th>
                                            <th>Tür</th>
                                            <th>Ücret</th>
                                            <th>Durum</th>
                                            <th>Açıklama</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${hasarlar.map(hasar => `
                                            <tr>
                                                <td>${new Date(hasar.hasar_tarihi).toLocaleDateString('tr-TR')}</td>
                                                <td>${hasar.hasar_turu}</td>
                                                <td>${hasar.hasar_ucret?.toLocaleString('tr-TR')} ₺</td>
                                                <td><span class="badge bg-${getHasarDurumClass(hasar.durum)}">${hasar.durum}</span></td>
                                                <td>${hasar.aciklama || '-'}</td>
                                            </tr>
                                        `).join('') || '<tr><td colspan="5" class="text-center">Hasar kaydı bulunamadı</td></tr>'}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modal);
        const modalElement = new bootstrap.Modal(document.getElementById('hasarGecmisiModal'));
        modalElement.show();

        document.getElementById('hasarGecmisiModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
    } catch (error) {
        console.error('Hata:', error);
        alert('Hasar geçmişi yüklenirken bir hata oluştu');
    }
};
window.showBakimBildirimleri = async function() {
    try {
        const response = await fetch('/api/araclar/bakim-bildirimleri');
        const bildirimler = await response.json();

        const modal = `
            <div class="modal fade" id="bakimBildirimleriModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Bakım Bildirimleri</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            ${bildirimler.length > 0 ? `
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Araç</th>
                                                <th>Plaka</th>
                                                <th>Mevcut KM</th>
                                                <th>Planlanan KM</th>
                                                <th>Kalan/Geçen KM</th>
                                                <th>Bakım Türü</th>
                                                <th>Durum</th>
                                                <th>İşlemler</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${bildirimler.map(bildirim => `
                                                <tr class="${bildirim.kalan_km < 0 ? 'table-danger' : (bildirim.kalan_km < 1000 ? 'table-warning' : '')}">
                                                    <td>${bildirim.marka} ${bildirim.model}</td>
                                                    <td>${bildirim.plaka}</td>
                                                    <td>${bildirim.mevcut_km.toLocaleString('tr-TR')} km</td>
                                                    <td>${bildirim.planlanan_km.toLocaleString('tr-TR')} km</td>
                                                    <td>
                                                        <span class="badge ${bildirim.kalan_km < 0 ? 'bg-danger' : (bildirim.kalan_km < 1000 ? 'bg-warning' : 'bg-info')}">
                                                            ${bildirim.kalan_km < 0 ? 
                                                                Math.abs(bildirim.kalan_km).toLocaleString('tr-TR') + ' km geçti' : 
                                                                bildirim.kalan_km.toLocaleString('tr-TR') + ' km kaldı'}
                                                        </span>
                                                    </td>
                                                    <td>${bildirim.bakim_turu}</td>
                                                    <td>
                                                        <span class="badge bg-${getBakimDurumClass(bildirim.durum)}">
                                                            ${bildirim.durum}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button class="btn btn-success btn-sm" onclick="showBakimModal(${bildirim.arac_id}, 'Yapılan')">
                                                            <i class="fas fa-wrench"></i> Bakım Yap
                                                        </button>
                                                    </td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            ` : '<div class="alert alert-info">Yaklaşan bakım bildirimi bulunmuyor.</div>'}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modal);
        const modalElement = new bootstrap.Modal(document.getElementById('bakimBildirimleriModal'));
        modalElement.show();

        document.getElementById('bakimBildirimleriModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
        updateBakimBildirimSayisi(bildirimler.length);
    } catch (error) {
        console.error('Bakım bildirimleri yükleme hatası:', error);
        alert('Bakım bildirimleri yüklenirken bir hata oluştu');
    }
};
function updateBakimBildirimSayisi(sayi) {
    const badge = document.getElementById('bakimBildirimSayisi');
    if (sayi > 0) {
        badge.textContent = sayi;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}
async function checkBakimBildirimleri() {
    try {
        const response = await fetch('/api/araclar/bakim-bildirimleri');
        const bildirimler = await response.json();
        updateBakimBildirimSayisi(bildirimler.length);
    } catch (error) {
        console.error('Bakım bildirimleri kontrol hatası:', error);
    }
}
async function loadAracPerformansGrafik() {
    const performansMetrigi = document.getElementById('performansMetrigi')?.value || 'kiralama';
    const secilenAraclar = Array.from(document.getElementById('aracFiltresi')?.selectedOptions || [])
        .map(option => option.value);
    const tarihAraligi = document.getElementById('tarihAraligi')?.value || '30';

    try {
        const response = await fetch(`/api/anasayfa/arac-performans?araclar=${secilenAraclar.join(',')}&tarihAraligi=${tarihAraligi}`);
        const data = await response.json();

        const ctx = document.getElementById('aracPerformansGrafik');
        if (!ctx) return;

        if (window.aracPerformansChart) {
            window.aracPerformansChart.destroy();
        }

        if (!data || data.length === 0) {
            ctx.parentElement.innerHTML = '<div class="alert alert-info">Seçilen tarih aralığında veri bulunmamaktadır.</div>';
            return;
        }

        const grupluVeriler = data.reduce((acc, item) => {
            if (!acc[item.ay_adi]) {
                acc[item.ay_adi] = {};
            }
            const aracAdi = `${item.marka} ${item.model} (${item.plaka})`;
            acc[item.ay_adi][aracAdi] = {
                kiralama: parseInt(item.kiralama_sayisi) || 0,
                kazanc: parseFloat(item.toplam_kazanc) || 0
            };
            return acc;
        }, {});

        const labels = Object.keys(grupluVeriler).sort((a, b) => {
            const [ayA, yilA] = a.split(' ').reverse();
            const [ayB, yilB] = b.split(' ').reverse();
            return new Date(`${ayA} 1, ${yilA}`) - new Date(`${ayB} 1, ${yilB}`);
        });

        const araclar = [...new Set(data.map(item => `${item.marka} ${item.model} (${item.plaka})`))];

        const datasets = araclar.map((arac, index) => ({
            label: arac,
            data: labels.map(ay => grupluVeriler[ay][arac]?.[performansMetrigi === 'kiralama' ? 'kiralama' : 'kazanc'] || 0),
            borderColor: getChartColor(index),
            backgroundColor: getChartColor(index),
            borderWidth: 2.5,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 8,
            pointStyle: 'circle',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            fill: false,
            shadowColor: 'rgba(0,0,0,0.1)',
            shadowBlur: 10
        }));

        window.aracPerformansChart = new Chart(ctx, {
            type: 'line',
            data: { 
                labels, 
                datasets 
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'start',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                family: "'Inter', sans-serif"
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: `Araç ${performansMetrigi === 'kiralama' ? 'Kiralama Sayıları' : 'Kazanç Analizi'}`,
                        font: {
                            size: 16,
                            weight: 'bold',
                            family: "'Inter', sans-serif"
                        },
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#2c3e50',
                        bodyColor: '#2c3e50',
                        borderColor: '#e1e4e8',
                        borderWidth: 1,
                        padding: 12,
                        bodyFont: {
                            size: 13,
                            family: "'Inter', sans-serif"
                        },
                        titleFont: {
                            size: 13,
                            family: "'Inter', sans-serif",
                            weight: 'bold'
                        },
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                let value = context.parsed.y;
                                if (performansMetrigi === 'kazanc') {
                                    return `${label}: ${value.toLocaleString('tr-TR')} ₺`;
                                }
                                return `${label}: ${value} kiralama`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        suggestedMax: Math.max(...datasets.flatMap(d => d.data)) * 1.2,
                        grid: {
                            color: 'rgba(0,0,0,0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            stepSize: 1,
                            font: {
                                size: 11,
                                family: "'Inter', sans-serif"
                            },
                            callback: function(value) {
                                if (performansMetrigi === 'kazanc') {
                                    return value.toLocaleString('tr-TR') + ' ₺';
                                }
                                return value;
                            }
                        },
                        title: {
                            display: true,
                            text: performansMetrigi === 'kiralama' ? 'Kiralama Sayısı' : 'Kazanç (₺)',
                            font: {
                                size: 12,
                                family: "'Inter', sans-serif",
                                weight: 'bold'
                            },
                            padding: {
                                top: 0,
                                bottom: 10
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            font: {
                                size: 11,
                                family: "'Inter', sans-serif"
                            }
                        },
                        title: {
                            display: true,
                            text: 'Ay',
                            font: {
                                size: 12,
                                family: "'Inter', sans-serif",
                                weight: 'bold'
                            },
                            padding: {
                                top: 10,
                                bottom: 0
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'index',
                    intersect: false
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    } catch (error) {
        console.error('Performans grafiği yükleme hatası:', error);
        const ctx = document.getElementById('aracPerformansGrafik');
        if (ctx) {
            ctx.parentElement.innerHTML = '<div class="alert alert-danger">Grafik yüklenirken bir hata oluştu</div>';
        }
    }
}
function getChartColor(index) {
    const colors = [
        '#2ecc71', '#3498db', '#e74c3c', '#f1c40f', '#9b59b6',
        '#1abc9c', '#e67e22', '#34495e', '#16a085', '#c0392b'
    ];
    return colors[index % colors.length];
}
async function updateAracFiltresi() {
    try {
        const aracFiltresi = document.getElementById('aracFiltresi');
        if (!aracFiltresi) return;
        const secilenAraclar = Array.from(aracFiltresi.selectedOptions).map(opt => opt.value);
        const araclarResponse = await fetch('/api/araclar');
        const araclar = await araclarResponse.json();
        $(aracFiltresi).select2('destroy');
        aracFiltresi.innerHTML = araclar.map(arac => `
            <option value="${arac.id}" ${secilenAraclar.includes(arac.id.toString()) ? 'selected' : ''}>
                ${arac.marka} ${arac.model} (${arac.plaka})
            </option>
        `).join('');
        $(aracFiltresi).select2({
            placeholder: 'Araç seçin',
            allowClear: true,
            closeOnSelect: false
        });
        $(document).off('click.select2close').on('click.select2close', function(e) {
            if (!$(e.target).closest('.select2-container').length && 
                !$(e.target).closest('.select2-dropdown').length) {
                $(aracFiltresi).select2('close');
            }
        });
        $(aracFiltresi).off('select2:closing').on('select2:closing', function(e) {
            if ($(document.activeElement).closest('.select2-container').length || 
                $(document.activeElement).closest('.select2-dropdown').length) {
                e.preventDefault();
            }
        });

    } catch (error) {
        console.error('Araç filtresi güncelleme hatası:', error);
    }
}