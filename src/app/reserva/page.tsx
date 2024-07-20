// app/reserva/reserva.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Rodape from '../components/Rodape';
import Background from '../components/Background';
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';



export default function Reserva() {

  const [adulto, setAdulto] = useState(1);
  const [crianca, setCrianca] = useState(0);
  const [total, setTotal] = useState(0);

  const AdicionarAdulto = () => {
    if(adulto < 4){
      setAdulto(adulto + 1)
    } else {
      console.log("Erro: Não é possível ter mais que 4 adultos");
    }

  };

  const RemoverAdulto = () => {
    if(adulto > 0){
      setAdulto(adulto - 1)
    }else{
      console.log("Erro: Não é possível ter menos que 0 adultos.");

    }
  };

  const AdicionarCrianca = () => {
    if(crianca < 4){
      setCrianca(crianca + 1);
    } else{
      console.log("Erro: Não é possível  ter mais que 4 crianças.");
    }
  };

  const RemoverCrianca = () => {
   if(crianca <= 4 && crianca > 0){
    setCrianca(crianca - 1);
   }else {
    console.log("Erro: Não é possível ter menos que 0 criança. ");
   }
  };
  useEffect(() => {
    setTotal(adulto + crianca);
  }, [adulto, crianca]);

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [error, setError] = useState(null);
  

  const buscarCep = () => {

    const urlBase = `https://viacep.com.br/ws/${cep}/json/`

    axios.get(urlBase)
      .then(response => {
        setEndereco(response.data);
        setError(null)
      })
      .catch(error => {
        console.log("Atenção: Erro ao buscar CEP", error)
        setError("Erro ao buscar CEP");
        setEndereco(null)
      })

  }



  return (
    <>
      <div className='container mx-auto flex justify-between items-center mt-3 sm:container sm:flex flex-col  md:flex md:flex-row'>
        <div className="flex items-center ">
          <h1 className="text-2xl font-bold ml-2 text-black-500">Pousada</h1>
          <p className="text-2xl font-bold ml-2 text-blue-500">da Montanha</p>
        </div>
        <Link href="/"><Image className="w-[50px] h-[50px] mr-4 hover: cursor-pointer" src="/seta" alt="Pousada Logo" width={100} height={80} /></Link>
      </div>

      <Background />

      <fieldset className="border border-blue-500 rounded-lg p-4 mt-10 container mx-auto h-full   ">
        <legend className="font-bold">POUSADA DA <span className="text-blue-500 font-bold">MONTANHA</span></legend>
        <h1 className="text-center mb-10 text-blue-500 font-bold">Faça sua reserva e venha curtir o interior da melhor pousada da região</h1>
        <div className="flex flex-row justify-center space-x-8">
          <fieldset className="border border-zinc-400 rounded-lg p-4 mt-10 w-[300px] h-[393px] ">
            <h2 className="text-center text-blue-500 font-bold">Check-in</h2>
            <p className="border border-blue-500"></p>
            <input type="date" className="w-[250px] mt-1 p-2 border border-gray-300 rounded-lg hover:outline-none hover:border-blue-500  ml-3" />
            <h3 className="text-2xl text-center mt-20 text-blue-500 font-bold">Selecionar <br /> Datas</h3>
          </fieldset>
          <fieldset className="border border-zinc-400 rounded-lg p-4 mt-10 w-[300px] h-[393px] ">
            <h2 className="text-center text-blue-500 font-bold">Check-out</h2>
            <p className="border border-blue-500"></p>
            <input type="date" className="w-[250px] mt-1 p-2 border border-gray-300 rounded-lg hover:outline-none hover:border-blue-500  ml-3" />
            <h3 className="text-2xl text-center mt-20 text-blue-500 font-bold">Selecionar <br /> Datas</h3>
          </fieldset>
        </div>
        <fieldset className="flex flex-row items-center justify-evenly space-x-8 m-auto mt-11 border border-zinc-500 w-[620px] h-11">
          <h3 className="font-bold text-blue-500">Adulto(s)</h3>
          <button onClick={AdicionarAdulto} className="border border-zinc-950 rounded-full h-7 w-7 mt-1 flex items-center justify-center">+</button>
          <p>{adulto}</p>
          <button onClick={RemoverAdulto} className="border border-zinc-950 rounded-full  h-7 w-7 mt-1 flex items-center justify-center">-</button>
        </fieldset>
        {
           adulto <= 0 && <p className="text-center mt-1 font-bold text-red-500">Atenção: Não é possível fazer a reserva com 0 ou menos de 0 adulto.Selecione novamente a quantidade de adulto(s)</p>
        }
        {
          adulto >= 4 && <p className="text-center mt-1 font-bold text-red-500">Atenção: 4 adultos é a  capacidade máxima  do quarto</p>
        }
        <fieldset className="flex flex-row items-center justify-evenly space-x-8 m-auto w-[620px] h-11 border border-zinc-500 mt-8">
          <h3 className="font-bold text-blue-500">Criança(s)</h3>
          <button onClick={AdicionarCrianca} className="border border-zinc-950 rounded-full h-7 w-7 mt-1 flex items-center justify-center">+</button>
          <p>{crianca}</p> 
          <button onClick={RemoverCrianca} className="border border-zinc-950 rounded-full  h-7 w-7 mt-1 flex items-center justify-center">-</button>
        </fieldset>
        {
          crianca >= 4 && <p  className="text-center mt-1 font-bold text-red-500">Atenção: 4 crinças é a capacidade máxima do quarto</p> 
        }
        {
          crianca < 0 && <p>Atenção: Não é possível ter menos que 0 criança</p>
        }
        <fieldset className="flex flex-row items-center justify-evenly space-x-8 m-auto w-[620px] h-11 border border-zinc-500 mt-8">
          <h3 className="font-bold text-blue-500">Total de hóspedes:</h3>
          <p>{total}</p>
        </fieldset>
        <h3 className='font-bold mt-10 ml-16'>Complete as informações abaixo:</h3>
        <div className='flex  justify-center mt-12 space-x-3 '>
          <button onClick={buscarCep}>Buscar CEP:</button>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder='Digite seu CEP'
            className='border border-zinc-600 '
            />
        </div>
        
        {
          endereco && (
            <div>
              <div className='flex flex-row justify-center mt-12 space-x-20'>
                <p className='border border-zinc-950 w-60 h-10 text-center '><span className='font-bold'>CEP digitado:</span> {endereco.cep}</p>
                <p  className='border border-zinc-950 w-60 h-10 text-center'>Logradouro: {endereco.logradouro}</p>
                <p  className='border border-zinc-950 w-60 h-10 text-center '>Complemento: {endereco.complemento}</p>
                <p  className='border border-zinc-950 w-60 h-10 text-center '>Bairro: {endereco.bairro}</p>
              </div>
              <div>
                <p>Localidade: {endereco.localidade}</p>
                <p>UF: {endereco.uf}</p>
                <p>DDD: {endereco.ddd}</p>
                <p>IBGE: {endereco.ibge}</p>
              </div>
              <div>
                <p>GIA: {endereco.gia}</p>
                <p>SIAFI: {endereco.siafi}</p>
              </div>
            
            </div>
            
          )
        }
        {error && <p>{error}</p> }
      </fieldset>
      
      <Rodape />
    </>
  );
}
