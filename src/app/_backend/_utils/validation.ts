export const validateFormData = (formData: { [key: string]: string | number | boolean }) => {
    const requiredFields = [
        { field: "nama", label: "Nama Lengkap" },
        { field: "email", label: "Email" },
        { field: "nomor", label: "Nomor WhatsApp" },
        { field: "gender", label: "Jenis Kelamin" },
        { field: "kesibukan", label: "Kesibukan" },
        { field: "knowlcfrom", label: "Tahu LC Dari" },
        { field: "umur", label: "Umur" },
      ];
      const missingFields = requiredFields.filter(
        (item) => !formData[item.field as keyof typeof formData]
      );
  
    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  };

  export const validateFormDataProgram = (formData: { [key: string]: string | number | boolean | { value: string; label: string } }) => {

    const requiredFields = [
        { field: "cabang", label: "Cabang" },
        { field: "periode", label: "Periode" },
        { field: "paket", label: "Paket" },
        { field: "paketdetail", label: "Durasi Paket" },
      ];
      
      // Tambahkan field berdasarkan nilai `data.paket`
      switch (formData.paket) {
        case "intergrated":
          requiredFields.push(
            { field: "jampertemuan", label: "Jam Pertemuan" }
          );
          break;
        case "private":
          requiredFields.push(
            { field: "jampertemuanprivate1", label: "Jam Pertemuan Private 1" },
            { field: "jampertemuanprivate2", label: "Jam Pertemuan Private 2" }
          );
          break;
        default:
          requiredFields.push(
            { field: "tipekamar", label: "Tipe Kamar" }
          );
          break;
      }
      
      // Cek field yang kosong
      const missingFields = requiredFields.filter(
        (item) => !formData[item.field as keyof typeof formData]
      );
      
      // Output validasi
      return {
        isValid: missingFields.length === 0,
        missingFields, // Field yang kosong beserta label
      };
      
  };

  export const validateFormDataAkomodasi= (formData: { [key: string]: string | number | boolean }) => {
    
    const requiredFields = [
        { field: "lokasijemput", label: "Penjemputan" },
        { field: "kendaraan", label: "Kendaraan" },
        { field: "penumpang", label: "Banyak Penumpang" },
      ];
      const missingFields = requiredFields.filter(
        (item) => !formData[item.field as keyof typeof formData]
      );
  
    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  };