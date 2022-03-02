import React, { Component } from "react";
import Data from "./ScoringPayakumbuh.json";
import "./DataDashboardV2.css";
import Mapscomponent from "./Component/MapsComponent/MapsComponent";
import Cardkecil from "./Component/CardKecil/CardKecil";
import Cardbesar from "./Component/CardBesar/CardBesar";
import Toparpu from "./Component/TopARPU/TopARPU";
import Toptvprogram from "./Component/TopTvProgram/TopTvProgram";
import Topprioritas from "./Component/TopPrioritas/TopPrioritas";

class Datadashboardv2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [], // array seluruh data

            statusLoad: false, // buat status load apakah udah ada
            statusLoadKel: false, // status load kelurahan apakah udah apa belum

            dataKecamatan: [], // data per kecamatan
            dataKelurahan: [], // data per kelurahan
            pilKecamatan: "", // ini buat ngambil data kelurahan per kecamatan

            dataPerKecamatan: [], // data per kecamatan
            dataKelurahanPerKecamatan: [], // data kelurahan per kecamatan

            pilKeyword: "", // pilihan parameter keyword
            dataWithKeyword: [], // data yang sesuai dengan parameter

            // untuk perhitungan card kecil
            jumlahPenduduk: null,
            jumlahKartuKeluarga: null,
            jumlahKTP: null,
            jumlahCustIndihome: null,
            jumlahCustHVC: null,
            avgRPU: null,
            jumlahARPU: null,

            tvCategory: [], // category yang tersedia
            tvCategoryJumlah: [], // jumlah per masing masing kategori
            tvCategoryData: [], // data lengkap tv program

            ARPUSetiapDataKelurahan: [],
            topARPU: [],
            topARPUKeyword: [],
            top3ARPU: [],
            top3ARPUWilayah: [],
            top3ARPUValue: [],

            dataPrioritas: [],
            dataPrioritasKeyword: [],
            dataPrioritasTemplate: [],
        };

        this.handleKelurahanChange = this.handleKelurahanChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleKecamatanChange = this.handleKecamatanChange.bind(this);
        this.pengelompokanDataKecamatan = this.pengelompokanDataKecamatan.bind(this);
        this.pengelompokanDataKelurahan = this.pengelompokanDataKelurahan.bind(this);
        this.pengambilanKelurahanPerKecamatan = this.pengambilanKelurahanPerKecamatan.bind(this);
        this.dataKecamatantoDataKeyword = this.dataKecamatantoDataKeyword.bind(this);
        this.perhitunganDataCardKecil = this.perhitunganDataCardKecil.bind(this);
        this.perhitunganTvProgram = this.perhitunganTvProgram.bind(this);
        this.pengelompokanARPU = this.pengelompokanARPU.bind(this);
        this.pengelompokanARPUKecamatanChange = this.pengelompokanARPUKecamatanChange.bind(this);
        this.pengelompokanARPUKelurahanChange = this.pengelompokanARPUKelurahanChange.bind(this);
        this.perhitunganScoring = this.perhitunganScoring.bind(this);
        this.perhitunganScoringKecamatanChange = this.perhitunganScoringKecamatanChange.bind(this);
        this.perhitunganScoringKelurahanChange = this.perhitunganScoringKelurahanChange.bind(this);
    }

    handleKelurahanChange = async (event) => {
        if (event.target.value === "") {
            this.handleReset();
        } else {
            await this.setState({
                pilKeyword: event.target.value,
                dataWithKeyword: [],
                statusLoadKel: false,
            });

            await this.pengelompokanDataKelurahan(event.target.value);

            // awal perhitungan data card kecil
            await this.perhitunganDataCardKecil();
            // akhir perhitungan data card kecil

            // awal perhitungan tv program
            await this.perhitunganTvProgram();
            // akhir perhitungan tv program

            await this.pengelompokanARPUKelurahanChange(event.target.value);

            await this.perhitunganScoringKelurahanChange(event.target.value);

            // console.log(this.state.dataWithKeyword);
            this.setState({
                statusLoadKel: true,
            });
        }
    };

    pengelompokanDataKelurahan = (keyword) => {
        this.state.data.map((data) => {
            if (data.desa_kelurahan === keyword) {
                this.state.dataWithKeyword.push(data);
            }
        });
    };

    handleKecamatanChange = async (event) => {
        if (event.target.value === "") {
            this.handleReset();
        } else {
            await this.setState({
                pilKeyword: event.target.value,
                pilKecamatan: event.target.value,
                dataPerKecamatan: [],
                dataKelurahanPerKecamatan: [],
                statusLoadKel: false,
                dataWithKeyword: [],
            });

            await this.pengelompokanDataKecamatan(this.state.pilKecamatan);

            await this.pengambilanKelurahanPerKecamatan();

            await this.dataKecamatantoDataKeyword();

            // awal perhitungan data card kecil
            await this.perhitunganDataCardKecil();
            // akhir perhitungan data card kecil

            // awal perhitungan tv program
            await this.perhitunganTvProgram();
            // akhir perhitungan tv program

            await this.pengelompokanARPUKecamatanChange(event.target.value);

            await this.perhitunganScoringKecamatanChange(event.target.value);

            this.setState({
                statusLoadKel: true,
            });
        }
    };

    pengelompokanDataKecamatan = (keyKecamatan) => {
        this.state.data.map((data) => {
            if (data.kecamatan === keyKecamatan) {
                this.state.dataPerKecamatan.push(data);
            }
        });
    };

    pengambilanKelurahanPerKecamatan = () => {
        this.state.dataPerKecamatan.map((data) => {
            const kelurahan = data.desa_kelurahan;

            if (!this.state.dataKelurahanPerKecamatan.includes(kelurahan)) {
                this.state.dataKelurahanPerKecamatan.push(kelurahan);
            }
        });
    };

    dataKecamatantoDataKeyword = () => {
        this.state.dataPerKecamatan.map((data) => this.state.dataWithKeyword.push(data));
    };

    perhitunganDataCardKecil = async () => {
        let jumlahPenduduk = 0;
        let jumlahKartuKeluarga = 0;
        let jumlahKTP = 0;
        let jumlahCustIndihome = 0;
        let jumlahCustHVC = 0;
        let jumlahAvgValue = 0;
        let jumlahJumlahAvgValue = 0;

        await this.state.dataWithKeyword.map((data) => {
            jumlahPenduduk += parseInt(data.jumlah_penduduk_kelurahan);
            jumlahKartuKeluarga += parseInt(data.jumlah_kk_kelurahan);
            jumlahKTP += parseInt(data.jumlah_ktp_kelurahan);
            jumlahCustIndihome += parseInt(data.jml_cust_indihome);
            jumlahCustHVC += parseInt(data.jml_plg_hvc);
            if (data.avg_arpu !== "0") {
                jumlahAvgValue += parseInt(data.avg_arpu);
                jumlahJumlahAvgValue += 1;
            }
        });

        await this.setState({
            jumlahPenduduk: jumlahPenduduk,
            jumlahKartuKeluarga: jumlahKartuKeluarga,
            jumlahKTP: jumlahKTP,
            jumlahCustIndihome: jumlahCustIndihome,
            jumlahCustHVC: jumlahCustHVC,
            tvCategoryJumlah: [],
            tvCategoryData: [],
            avgRPU: jumlahAvgValue / jumlahJumlahAvgValue,
            jumlahARPU: parseInt(jumlahAvgValue),
        });
    };

    perhitunganTvProgram = async () => {
        await this.state.tvCategory.map((category) => {
            let jumlah = 0;
            this.state.dataWithKeyword.map((data) => {
                if (data.top_tv_genre_program1 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program2 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program3 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program4 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program5 === category) {
                    jumlah += 1;
                }
            });
            // buat Sorting top 5
            this.state.tvCategoryData.push({
                category: category,
                jumlah: jumlah,
            });
            this.state.tvCategoryJumlah.push(jumlah);
        });

        function compare(a, b) {
            if (a.jumlah > b.jumlah) {
                return -1;
            }
            if (a.jumlah < b.jumlah) {
                return 1;
            }
            return 0;
        }

        this.state.tvCategoryData.sort(compare);
    };

    handleReset = async () => {
        await this.setState({
            data: [],

            statusLoad: false,
            statusLoadKel: false,

            dataKecamatan: [],
            dataKelurahan: [],
            pilKecamatan: "",

            dataPerKecamatan: [],
            dataKelurahanPerKecamatan: [],

            pilKeyword: "PAYAKUMBUH",
            dataWithKeyword: [],

            // untuk perhitungan card kecil
            jumlahPenduduk: null,
            jumlahKartuKeluarga: null,
            jumlahKTP: null,
            jumlahCustIndihome: null,
            jumlahCustHVC: null,
            avgRPU: null,
            jumlahARPU: null,

            tvCategory: [],
            tvCategoryJumlah: [],
            tvCategoryData: [],

            top3ARPU: [],
            topARPUKeyword: [],
            top3ARPUValue: [],
            top3ARPUWilayah: [],
        });

        await Data.map((data) => this.state.data.push(data));

        await this.state.data.map((data) => {
            const kecamatan = data.kecamatan;
            if (!this.state.dataKecamatan.includes(kecamatan)) {
                this.state.dataKecamatan.push(kecamatan);
            }

            const kelurahan = data.desa_kelurahan;
            const statusKel = this.state.dataKelurahan.includes(kelurahan);
            if (statusKel === false) {
                this.state.dataKelurahan.push(kelurahan);
            }
        });

        // awal perhitungan data card kecil
        let jumlahPenduduk = 0;
        let jumlahKartuKeluarga = 0;
        let jumlahKTP = 0;
        let jumlahCustIndihome = 0;
        let jumlahCustHVC = 0;
        let jumlahAvgValue = 0;
        let jumlahJumlahAvgValue = 0;

        await this.state.data.map((data) => {
            jumlahPenduduk += parseInt(data.jumlah_penduduk_kelurahan);
            jumlahKartuKeluarga += parseInt(data.jumlah_kk_kelurahan);
            jumlahKTP += parseInt(data.jumlah_ktp_kelurahan);
            jumlahCustIndihome += parseInt(data.jml_cust_indihome);
            jumlahCustHVC += parseInt(data.jml_plg_hvc);

            if (data.avg_arpu !== "0") {
                jumlahAvgValue += parseFloat(data.avg_arpu);
                jumlahJumlahAvgValue += 1;
            }
        });

        await this.setState({
            jumlahPenduduk: jumlahPenduduk,
            jumlahKartuKeluarga: jumlahKartuKeluarga,
            jumlahKTP: jumlahKTP,
            jumlahCustIndihome: jumlahCustIndihome,
            jumlahCustHVC: jumlahCustHVC,
            avgRPU: jumlahAvgValue / jumlahJumlahAvgValue,
            jumlahARPU: parseInt(jumlahAvgValue),
        });
        // akhir perhitungan data card kecil

        // awal perhitungan tv program
        await this.state.data.map((data) => {
            if (!this.state.tvCategory.includes(data.top_tv_genre_program1) && data.top_tv_genre_program1 !== "-") {
                this.state.tvCategory.push(data.top_tv_genre_program1);
            }
            if (!this.state.tvCategory.includes(data.top_tv_genre_program2) && data.top_tv_genre_program2 !== "-") {
                this.state.tvCategory.push(data.top_tv_genre_program2);
            }
            if (!this.state.tvCategory.includes(data.top_tv_genre_program3) && data.top_tv_genre_program3 !== "-") {
                this.state.tvCategory.push(data.top_tv_genre_program3);
            }
            if (!this.state.tvCategory.includes(data.top_tv_genre_program4) && data.top_tv_genre_program4 !== "-") {
                this.state.tvCategory.push(data.top_tv_genre_program4);
            }
            if (!this.state.tvCategory.includes(data.top_tv_genre_program5) && data.top_tv_genre_program5 !== "-") {
                this.state.tvCategory.push(data.top_tv_genre_program5);
            }
        });

        await this.state.tvCategory.map((category) => {
            let jumlah = 0;
            this.state.data.map((data) => {
                if (data.top_tv_genre_program1 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program2 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program3 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program4 === category) {
                    jumlah += 1;
                }
                if (data.top_tv_genre_program5 === category) {
                    jumlah += 1;
                }
            });
            // buat Sorting top 5
            this.state.tvCategoryData.push({
                category: category,
                jumlah: jumlah,
            });
            this.state.tvCategoryJumlah.push(jumlah);
        });

        function compare(a, b) {
            if (a.jumlah > b.jumlah) {
                return -1;
            }
            if (a.jumlah < b.jumlah) {
                return 1;
            }
            return 0;
        }

        await this.state.tvCategoryData.sort(compare);

        await this.pengelompokanARPU();
        // akhir perhitungan tv program

        await this.perhitunganScoring();

        this.setState({
            statusLoad: true,
        });
    };

    perhitunganScoring = async () => {
        await this.setState({
            dataPrioritas: [],
            dataPrioritasKeyword: [],
        });

        await this.state.dataKelurahan.map((kelurahan) => {
            let jumlahNilaiScoring = 0;
            let jumlahJumlahNilaiScoring = 0;
            let namaKecamatan = "";

            this.state.data.map((data) => {
                if (data.desa_kelurahan === kelurahan) {
                    jumlahNilaiScoring += parseInt(data.nilai);
                    jumlahJumlahNilaiScoring += 1;
                    namaKecamatan = data.kecamatan;
                }
                // console.log(data.kecamatan);
            });
            this.state.dataPrioritas.push({
                namaKelurahan: kelurahan,
                nilaiScoring: jumlahNilaiScoring / jumlahJumlahNilaiScoring,
                namaKecamatan: namaKecamatan,
            });
        });

        function compare(a, b) {
            if (a.nilaiScoring > b.nilaiScoring) {
                return -1;
            }
            if (a.nilaiScoring < b.nilaiScoring) {
                return 1;
            }
            return 0;
        }

        await this.state.dataPrioritas.sort(compare);

        await this.state.dataPrioritas.map((data, index) => {
            if (index < 10) {
                this.state.dataPrioritasKeyword.push({
                    namaKelurahan: data.namaKelurahan,
                    nilaiScoring: data.nilaiScoring.toFixed(2),
                });
            }
        });
        console.log(this.state.dataPrioritasKeyword);
    };

    perhitunganScoringKecamatanChange = async (keyword) => {
        await this.setState({
            dataPrioritasTemplate: [],
            dataPrioritasKeyword: [],
        });

        await this.state.dataPrioritas.map((data) => {
            if (data.namaKecamatan === keyword) {
                this.state.dataPrioritasTemplate.push({
                    namaKelurahan: data.namaKelurahan,
                    nilaiScoring: data.nilaiScoring.toFixed(2),
                });
            }
        });

        await this.state.dataPrioritasTemplate.map((data, index) => {
            if (index < 10) {
                this.state.dataPrioritasKeyword.push(data);
            }
        });
    };

    perhitunganScoringKelurahanChange = async (keyword) => {
        await this.setState({
            dataPrioritasTemplate: [],
            dataPrioritasKeyword: [],
        });

        await this.state.dataPrioritas.map((data) => {
            if (data.namaKelurahan === keyword) {
                this.state.dataPrioritasTemplate.push({
                    namaKelurahan: data.namaKelurahan,
                    nilaiScoring: data.nilaiScoring.toFixed(2),
                });
            }
        });

        await this.state.dataPrioritasTemplate.map((data, index) => {
            if (index < 10) {
                this.state.dataPrioritasKeyword.push(data);
            }
        });
        console.log(this.state.dataPrioritasKeyword);
    };

    componentDidMount() {
        this.handleReset();
    }

    pengelompokanARPU = async () => {
        // bertujuan untuk charting kelompok arpu
        // console.log(this.state.dataKelurahan);
        await this.setState({
            ARPUSetiapDataKelurahan: [],
            topARPU: [],
            topARPUKeyword: [],
            top3ARPU: [],
            top3ARPUWilayah: [],
            top3ARPUValue: [],
        });
        await this.state.dataKelurahan.map(async (kelurahan) => {
            await this.setState({
                ARPUSetiapDataKelurahan: [],
            });
            let jumlahAvgValue = 0;
            let jumlahJumlahAvgValue = 0;
            let namaKecamatan = "";
            this.state.data.map((data) => {
                if (data.desa_kelurahan === kelurahan) {
                    if (data.avg_arpu !== 0) {
                        jumlahAvgValue += parseInt(data.avg_arpu);
                        jumlahJumlahAvgValue += 1;
                    }
                    namaKecamatan = data.kecamatan;
                }
            });

            this.state.topARPU.push({
                namaKelurahan: kelurahan,
                valueARPU: jumlahAvgValue / jumlahJumlahAvgValue,
                namaKecamatan: namaKecamatan,
            });

            this.state.ARPUSetiapDataKelurahan.push(jumlahAvgValue / jumlahJumlahAvgValue);
        });

        function compare(a, b) {
            if (a.valueARPU > b.valueARPU) {
                return -1;
            }
            if (a.valueARPU < b.valueARPU) {
                return 1;
            }
            return 0;
        }

        await this.state.topARPU.sort(compare);

        for (let i = 0; i < 3; i++) {
            this.state.top3ARPU.push({
                namaKelurahan: this.state.topARPU[i].namaKelurahan,
                valueARPU: this.state.topARPU[i].valueARPU,
            });
        }

        this.state.top3ARPU.map((data) => {
            this.state.top3ARPUWilayah.push(data.namaKelurahan);
            this.state.top3ARPUValue.push(data.valueARPU);
        });
    };

    pengelompokanARPUKecamatanChange = async (keyword) => {
        await this.setState({
            top3ARPU: [],
            topARPUKeyword: [],
            top3ARPUValue: [],
            top3ARPUWilayah: [],
        });

        await this.state.topARPU.map((data) => {
            if (data.namaKecamatan === keyword) {
                this.state.topARPUKeyword.push({
                    namaKelurahan: data.namaKelurahan,
                    valueARPU: data.valueARPU,
                });
            }
        });

        for (let i = 0; i < 3; i++) {
            this.state.top3ARPU.push({
                namaKelurahan: this.state.topARPUKeyword[i].namaKelurahan,
                valueARPU: this.state.topARPUKeyword[i].valueARPU,
            });
        }

        this.state.top3ARPU.map((data) => {
            this.state.top3ARPUWilayah.push(data.namaKelurahan);
            this.state.top3ARPUValue.push(data.valueARPU);
        });
    };

    pengelompokanARPUKelurahanChange = async (keyword) => {
        await this.setState({
            top3ARPU: [],
            topARPUKeyword: [],
            top3ARPUValue: [],
            top3ARPUWilayah: [],
        });

        await this.state.topARPU.map((data) => {
            if (data.namaKelurahan === keyword) {
                this.state.topARPUKeyword.push({
                    namaKelurahan: data.namaKelurahan,
                    valueARPU: data.valueARPU,
                });
            }
        });

        for (let i = 0; i < 1; i++) {
            this.state.top3ARPU.push({
                namaKelurahan: this.state.topARPUKeyword[i].namaKelurahan,
                valueARPU: this.state.topARPUKeyword[i].valueARPU,
            });
        }

        this.state.top3ARPU.map((data) => {
            this.state.top3ARPUWilayah.push(data.namaKelurahan);
            this.state.top3ARPUValue.push(data.valueARPU);
        });
    };

    render() {
        const statusPilKecamatan = this.state.pilKecamatan;

        const optionKelurahan =
            statusPilKecamatan === ""
                ? this.state.dataKelurahan.map((kel) => (
                      <option value={kel} key={kel}>
                          {kel}
                      </option>
                  ))
                : this.state.dataKelurahanPerKecamatan.map((kel) => (
                      <option value={kel} key={kel}>
                          {kel}
                      </option>
                  ));

        const apa = this.state.pilKeyword === "" ? "Kota Payakumbuh" : this.state.pilKeyword;

        return (
            <div>
                {this.state.statusLoad === false ? (
                    <div>
                        <h1>load</h1>
                    </div>
                ) : (
                    <div id="dataDashboardV2">
                        <div id="formNavbar">
                            <div className="formNavbar-container">
                                <div className="wilayahApa">{apa}</div>

                                <form className="formContainer" action="">
                                    <label className="formLabel" htmlFor="">
                                        Kecamatan :
                                    </label>
                                    <select onChange={this.handleKecamatanChange} className="selectOption" name="" id="">
                                        <option value="">Pilih Kecamatan</option>
                                        {this.state.dataKecamatan.map((kec) => (
                                            <option value={kec} key={kec}>
                                                {kec}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="formLabel formLabel2" htmlFor="">
                                        Kelurahan :
                                    </label>
                                    <select onChange={this.handleKelurahanChange} className="selectOption selectOption2" name="" id="">
                                        <option value="">Pilih Kelurahan</option>
                                        {optionKelurahan}
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div id="dataDashboard-container">
                            <div className="row">
                                <div className="mapsContent-container">
                                    <Mapscomponent keyword={this.state.pilKeyword} />
                                </div>
                                <div className="row1-rightside">
                                    <div className="floating">
                                        <Toptvprogram tvCategoryData={this.state.tvCategoryData} />
                                    </div>
                                    <div className="floating">
                                        <Topprioritas scoringPrioritas={this.state.dataPrioritasKeyword} />
                                    </div>
                                </div>
                            </div>
                            <div className="row row2">
                                <div className="row2-leftSection">
                                    <div className="row2-leftSection-left floating">
                                        <div>
                                            <Cardkecil judul={"Jumlah Penduduk"} value={this.state.jumlahPenduduk.toLocaleString()} />
                                        </div>
                                        <div className="row2-leftSection-row2">
                                            <Cardkecil judul={"Jumlah Pelanggan Indihome"} value={this.state.jumlahCustIndihome.toLocaleString()} />
                                        </div>
                                    </div>
                                    <div className="row2-leftSection-right floating">
                                        <div>
                                            <Cardbesar judul={"Jumlah Kartu Keluarga"} value={this.state.jumlahKartuKeluarga.toLocaleString()} />
                                        </div>
                                        <div className="row2-leftSection-row2">
                                            <Cardbesar judul={"Total ARPU"} value={this.state.jumlahARPU.toLocaleString()} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row2-middleSection">
                                    <Toparpu labelWilayah={this.state.top3ARPUWilayah} valueARPU={this.state.top3ARPUValue} />
                                </div>
                                {/* <div className="row2-rightSection">
                                    <button
                                        onClick={() => {
                                            console.log(this.state.tvCategoryJumlah);
                                        }}
                                    >
                                        tes
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Datadashboardv2;
