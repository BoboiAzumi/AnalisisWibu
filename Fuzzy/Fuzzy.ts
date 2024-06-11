import { Membership } from "./Membership";

export function Fuzzy(anime: number, jpop: number, simp: number){
    // Fuzzifikasi : Inisialisasi Objek
    const Anime = new Membership("Anime")
    const JPOP = new Membership("JPOP")
    const SIMP = new Membership("SIMP")
    const WIBU = new Membership("TINGKAT WIBU")

    // Fuzzifikasi Anime
    Anime.setMembershipFunction("Sedikit", "MinLinearFunction", [25, 75])
    Anime.setMembershipFunction("Sedang", "TriangleFunction", [25, 50, 75])
    Anime.setMembershipFunction("Banyak", "MaxLinearFunction", [25, 75])
    Anime.setX(anime)
    Anime.calculate()
    const Anime_Weight = Anime.getWeight()

    // Fuzzifikasi JPOP
    JPOP.setMembershipFunction("Sedikit", "MinLinearFunction", [25, 75])
    JPOP.setMembershipFunction("Sedang", "TriangleFunction", [25, 50, 75])
    JPOP.setMembershipFunction("Banyak", "MaxLinearFunction", [25, 75])
    JPOP.setX(jpop)
    JPOP.calculate()
    const JPOP_Weight = JPOP.getWeight()

    // Fuzzifikasi SIMP
    SIMP.setMembershipFunction("Sedikit", "MinLinearFunction", [5, 10])
    SIMP.setMembershipFunction("Sedang", "TriangleFunction", [5, 10, 15])
    SIMP.setMembershipFunction("Banyak", "MaxLinearFunction", [10, 15])
    SIMP.setX(simp)
    SIMP.calculate()
    const SIMP_Weight = SIMP.getWeight()

    // Fuzzifikasi WIBU
    WIBU.setMembershipFunction("Bukan_Wibu", "MinLinearFunction", [0, 100])
    WIBU.setMembershipFunction("Wibu", "MaxLinearFunction", [0, 100])

    // Fuzzy Rules
    let Rules = {
        Bukan_Wibu: [] as number[],
        Wibu: [] as number[]
    };

    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Sedikit, JPOP_Weight.weight.Sedikit, SIMP_Weight.weight.Sedikit))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Sedikit, JPOP_Weight.weight.Sedikit, SIMP_Weight.weight.Sedang))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Sedikit, JPOP_Weight.weight.Sedikit, SIMP_Weight.weight.Banyak))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Sedikit, JPOP_Weight.weight.Sedang, SIMP_Weight.weight.Sedikit))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Sedikit, JPOP_Weight.weight.Sedang, SIMP_Weight.weight.Sedang))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Sedikit, JPOP_Weight.weight.Sedang, SIMP_Weight.weight.Banyak))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Sedikit, JPOP_Weight.weight.Banyak, SIMP_Weight.weight.Sedikit))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Sedikit, JPOP_Weight.weight.Banyak, SIMP_Weight.weight.Sedang))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Sedikit, JPOP_Weight.weight.Banyak, SIMP_Weight.weight.Banyak))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Sedang, JPOP_Weight.weight.Sedikit, SIMP_Weight.weight.Sedikit))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Sedang, JPOP_Weight.weight.Sedikit, SIMP_Weight.weight.Sedang))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Sedang, JPOP_Weight.weight.Sedikit, SIMP_Weight.weight.Banyak))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Sedang, JPOP_Weight.weight.Sedang, SIMP_Weight.weight.Sedikit))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Sedang, JPOP_Weight.weight.Sedang, SIMP_Weight.weight.Sedang))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Sedang, JPOP_Weight.weight.Sedang, SIMP_Weight.weight.Banyak))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Sedang, JPOP_Weight.weight.Banyak, SIMP_Weight.weight.Sedikit))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Sedang, JPOP_Weight.weight.Banyak, SIMP_Weight.weight.Sedang))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Sedang, JPOP_Weight.weight.Banyak, SIMP_Weight.weight.Banyak))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Banyak, JPOP_Weight.weight.Sedikit, SIMP_Weight.weight.Sedikit))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Banyak, JPOP_Weight.weight.Sedikit, SIMP_Weight.weight.Sedang))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Banyak, JPOP_Weight.weight.Sedikit, SIMP_Weight.weight.Banyak))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Banyak, JPOP_Weight.weight.Sedang, SIMP_Weight.weight.Sedikit))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Banyak, JPOP_Weight.weight.Sedang, SIMP_Weight.weight.Sedang))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Banyak, JPOP_Weight.weight.Sedang, SIMP_Weight.weight.Banyak))
    Rules["Bukan_Wibu"].push(Math.min(Anime_Weight.weight.Banyak, JPOP_Weight.weight.Banyak, SIMP_Weight.weight.Sedikit))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Banyak, JPOP_Weight.weight.Banyak, SIMP_Weight.weight.Sedang))
    Rules["Wibu"].push(Math.min(Anime_Weight.weight.Banyak, JPOP_Weight.weight.Banyak, SIMP_Weight.weight.Banyak))

    let Rule = {
        Bukan_Wibu: Math.max(...Rules["Bukan_Wibu"]),
        Wibu: Math.max(...Rules["Wibu"])
    }

    // Deffuzifikasi
    let T = [0, 0];
    if(Rule.Bukan_Wibu > Rule.Wibu){
        T[0] = 0 - (((100 - 0) * Rule.Bukan_Wibu) - 100);
        T[1] = 0 - (((100 - 0) * Rule.Wibu) - 100);
    }
    else{
        T[0] = ((100 - 0) * Rule.Bukan_Wibu) + 0
        T[1] = ((100 - 0) * Rule.Wibu) + 0
    }

    const COMPOSITION_FUNCTION = (a: number, b: number, z: number) => {
        if(a < T[0] && b == T[0]){
            return Rule.Bukan_Wibu;
        }
        else if(a >= T[0] && b <= T[1]){
            if(Rule.Bukan_Wibu > Rule.Wibu){
                return ((100 - z) / (100 - 0))
            }
            else{
                return ((z - 0) / (100 - 0))
            }
        }
        else{
            return Rule.Wibu;
        }
    }

    const Integral = (a: number, b: number, N: number, f: Function) => {
        const deltaX = (b - a) / N;
        let sum = 0.5 * (f(a) + f(b));
        for(let i = 1; i < N; i++){
            let x = a + (i * deltaX)
            sum += f(x);
        }
        return (sum * deltaX)
    }

    const M = [] as number[];
    const Num = 10000; // Akurasi Integral
    M[0] = Integral(0, T[0], Num, (z: number) => {
        return (COMPOSITION_FUNCTION(0, T[0], z) * z)
    });
    M[1] = Integral(T[0], T[1], Num, (z: number) => {
        return (COMPOSITION_FUNCTION(T[0], T[1], z) * z)
    });
    M[2] = Integral(T[1], 100, Num, (z: number) => {
        return (COMPOSITION_FUNCTION(T[1], 100, z) * z)
    });

    const L = [] as number[];
    L[0] = Integral(0, T[0], Num, (z: number) => {
        return (COMPOSITION_FUNCTION(0, T[0], z))
    });
    L[1] = Integral(T[0], T[1], Num, (z: number) => {
        return (COMPOSITION_FUNCTION(T[0], T[1], z))
    });
    L[2] = Integral(T[1], 100, Num, (z: number) => {
        return (COMPOSITION_FUNCTION(T[1], 100, z))
    });

    const Sum_M = M.reduce((pv, c) => pv + c, 0)
    const Sum_L = L.reduce((pv, c) => pv + c, 0)
    const CenterOfArea = Sum_M / Sum_L;
    console.log("Total Anime : "+anime)
    console.log("Total JPOP Playlist : "+jpop)
    console.log("Total Waifu : "+simp)
    console.log()

    console.log("Rule Weight (Rule.Bukan_Wibu) : "+Rule.Bukan_Wibu)
    console.log("Rule Weight (Rule.Wibu) : "+Rule.Wibu)
    console.log("T Value : ")
    console.log(T)
    console.log("Moment Value : ")
    console.log(M)
    console.log("Area : ")
    console.log(L)
    console.log("Total Moment : "+Sum_M)
    console.log("Total Area : "+Sum_L)
    console.log("Center of Area : "+CenterOfArea)
    console.log("Result : ")
    console.log(WIBU.process(CenterOfArea))
    console.log("Output : ")
    console.log(WIBU.getCrisp())
}