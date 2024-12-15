
import React from 'react';
import Input from './_components/_partials/input';
import CustomLayout from './_components/layout';
import Label from './_components/_partials/label';
import Select from './_components/_partials/select';
import Button from './_components/_partials/button';

export default function Page() {
  // Data opsi dropdown
  const genderOptions = [
    { value: "laki-laki", label: "Laki-laki" },
    { value: "perempuan", label: "Perempuan" },
  ];

  const kesibukanOptions = [
    { value: "pelajar", label: "Pelajar" },
    { value: "mahasiswa", label: "Mahasiswa" },
    { value: "pekerja", label: "Pekerja" },
  ];

  const knowLCFromOptions = [
    { value: "instagram", label: "Instagram" },
    { value: "facebook", label: "Facebook" },
    { value: "iklan", label: "Iklan" },
  ];
  return (
    <CustomLayout mainline="Langkah pertama untuk sukses dimulai di sini! 🚀" line="Let's conquer English together! 💪 #KampungInggrisLC #BestEnvironmentForTheBestResult">
      <div className="mx-auto flex flex-col space-y-6">

        <div className=" flex flex-col space-y-2">
          <Label htmlFor="nama" required >Nama Lengkap :</Label>
          <Input type="text" placeholder="Masukan nama lengkap anda" name='nama' />
        </div>

      <div className="flex flex-row space-x-4">
        <div className="flex flex-col space-y-2 w-1/2">
          <Label htmlFor="email" required>Email :</Label>
          <Input type="email" placeholder="youremail@gmail.com" required/>
        </div>
        <div className="flex flex-col space-y-2  w-1/2">
          <Label htmlFor="nomor" required>Nomor WhatsApp :</Label>
          <Input type="text" placeholder="0857xxxxxx" required/>
        </div>
      </div>

      <div className="flex flex-row space-x-4">
        <div className="flex flex-col space-y-2 w-1/2">
          <Label htmlFor="gender" required>Gender :</Label>
          <Select name="gender" options={genderOptions} required />
        </div>
        <div className="flex flex-col space-y-2  w-1/2">
        <Label htmlFor="kesibukan" required>Kesibukan :</Label>
        <Select name="kesibukan" options={kesibukanOptions} required/>
        </div>
      </div>

      <div className=" flex flex-col space-y-2">
          <Label htmlFor="knowlcfrom" required >Tau LC Darimana :</Label>
          <Select name="knowlcfrom" options={knowLCFromOptions} required/>
        </div>
      
      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-300 text-sm mt-5 ">Pastikan anda telah mengisi data diri dengan baik & benar sebelum lanjut!</p>
        <Button type="submit" className="w-full">Yuk Lanjut!</Button>
      </div>
    
      </div>

    </CustomLayout>
  );
};