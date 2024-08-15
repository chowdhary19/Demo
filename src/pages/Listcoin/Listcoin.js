import './Listcoin.css';

import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

import coinLocatorImg from '../../assets/img/Form/artboard1.png';
import openFolderImg from '../../assets/img/Form/openFolder.png';
import getListedCoin from '../../assets/img/Form/getListedCoin.png';
import bscImg from '../../assets/img/binance.svg';
import ethImg from '../../assets/img/ethereum.svg';

export const Listcoin = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    network: 'BSC',
    description: '',
    chartlink: '',
    swaplink: '',
    websitelink: '',
    telegramlink: '',
    twitterlink: '',
    discordlink: '',
    contactemail: '',
    kyc: '',
    audit: '',
    videolink: '',
    cmclink: '',
    contractAddr: '',
    presaleflag: false,
    logoImg: openFolderImg,
    checked: false,
    startDate: new Date(),
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDateChange = (date) =>
    setFormData((prev) => ({
      ...prev,
      startDate: date,
    }));

  const validateFunc = () => {
    const {
      name,
      symbol,
      network,
      websitelink,
      telegramlink,
      contractAddr,
      logoImg,
      checked,
    } = formData;
    return (
      name &&
      symbol &&
      network &&
      websitelink &&
      telegramlink &&
      contractAddr &&
      logoImg !== openFolderImg &&
      checked
    );
  };

  const backBtnClicked = () => {
    console.log(process.env.REACT_APP_SERVER_URL);
    navigate(-1, {replace: true});
  }

  const submitListingInfo = () => {
    if (!validateFunc()) {
      NotificationManager.error(
        'You must fill all the required fields and agree to the terms.'
      );
      return;
    }

    if(checked === false){
      NotificationManager.error("You have to agree with Terms and Conditions.");
      return;
    }

  if(logoImg === openFolderImg){ 
    NotificationManager.error("You have to upload logo image before submit.");
    return;
    }

    const { chartlink } = formData;
    if (
      chartlink &&
      !chartlink.includes('https://poocoin.app/') &&
      !chartlink.includes('https://dextools.io/')
    ) {
      NotificationManager.error(
        'You have to insert only Poocoin or Dextool URL for the chart link.'
      );
      return;
    }

    const buffer = {
      ...formData,
      launch: Math.floor(new Date(formData.startDate).getTime() / 1000),
      listed: Math.floor(Date.now() / 1000),
      voteCount: 0,
      dailyStart: 0,
      dailyCount: 0,
      weeklyStart: 0,
      weeklyCount: 0,
      watchlist: '',
      promoted: 0,
    };

    navigate('/tiers/', { state: { info: buffer, id: '' } });
  };

  const imgUploadInput = (e) => {
    const file = e.target.files[0];

    // Clear previous image state
    setFormData((prev) => ({ ...prev, logoImg: openFolderImg }));

    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      NotificationManager.error('Only JPG, PNG, and SVG files are allowed.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      // 2 MB
      NotificationManager.error('File size must be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      // Set new image and show success message
      setFormData((prev) => ({ ...prev, logoImg: evt.target.result }));
      NotificationManager.success('Image uploaded successfully.');
    };
    reader.readAsDataURL(file);
  };

  const {
    name,
    symbol,
    network,
    description,
    chartlink,
    swaplink,
    websitelink,
    telegramlink,
    twitterlink,
    discordlink,
    contactemail,
    kyc,
    audit,
    videolink,
    cmclink,
    contractAddr,
    presaleflag,
    logoImg,
    checked,
    startDate,
  } = formData;

  return (
    <div className="listCoinDiv">
      <div className="listCoinDivWrap">
        <div className="listHeader">
          <span>Submit new coin to</span>
          <img src={coinLocatorImg} alt="Coin Locator" />
        </div>
        <div className="uploadImgDivWrap">
          <div className="openFolderImg">
            <span className="titleInput">
              Logo Upload*
              <br />
              (.jpg .png .svg)
            </span>
            <label htmlFor="uploadFileInput">
              <input
                type="file"
                id="uploadFileInput"
                className="uploadFile"
                style={{ display: 'none' }}
                onChange={imgUploadInput}
              />
              <img src={logoImg} alt="Logo Upload" />
            </label>
          </div>
          <div className="getListedCoin">
            <img src={getListedCoin} alt="Get Listed Coin" />
          </div>
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Name*</span>
          <input
            className="listingInput"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Symbol*</span>
          <input
            className="listingInput"
            name="symbol"
            value={symbol}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Network/Chain*</span>
          <div className="radioDiv">
            <input
              type="radio"
              id="BSC"
              name="network"
              value="BSC"
              checked={network === 'BSC'}
              onChange={handleChange}
            />
            <img src={bscImg} alt="BSC" />
            <label htmlFor="BSC">&nbsp;BSC&nbsp;&nbsp;</label>
            <input
              type="radio"
              id="ETH"
              name="network"
              value="ETH"
              checked={network === 'ETH'}
              onChange={handleChange}
            />
            <img src={ethImg} alt="ETH" />
            <label htmlFor="ETH">&nbsp;ETH&nbsp;&nbsp;</label>
          </div>
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Contract Address*</span>
          <input
            className="listingInput"
            name="contractAddr"
            value={contractAddr}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Project in presale phase?*</span>
          <div className="radioDiv">
            <input
              type="radio"
              id="no"
              name="presaleflag"
              value="No"
              checked={!presaleflag}
              onChange={handleChange}
            />
            <label htmlFor="no">No</label>
            <input
              type="radio"
              id="yes"
              name="presaleflag"
              value="Yes"
              checked={presaleflag}
              onChange={handleChange}
            />
            <label htmlFor="yes">Yes</label>
          </div>
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Website Link*</span>
          <input
            className="listingInput"
            name="websitelink"
            value={websitelink}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Telegram Link*</span>
          <input
            className="listingInput"
            name="telegramlink"
            value={telegramlink}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Twitter Link</span>
          <input
            className="listingInput"
            name="twitterlink"
            value={twitterlink}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Discord Link</span>
          <input
            className="listingInput"
            name="discordlink"
            value={discordlink}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Contact Email*</span>
          <input
            className="listingInput"
            name="contactemail"
            value={contactemail}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">
            Chart Link
            <br />
            (Poocoin/Dextool only)
          </span>
          <input
            className="listingInput"
            name="chartlink"
            value={chartlink}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Swap Link</span>
          <input
            className="listingInput"
            name="swaplink"
            value={swaplink}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Description</span>
          <textarea
            className="listingTextarea"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">KYC</span>
          <input
            className="listingInput"
            name="kyc"
            value={kyc}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Audit</span>
          <input
            className="listingInput"
            name="audit"
            value={audit}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Video Link</span>
          <input
            className="listingInput"
            name="videolink"
            value={videolink}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">CMC Link</span>
          <input
            className="listingInput"
            name="cmclink"
            value={cmclink}
            onChange={handleChange}
          />
        </div>
        <div className="listingNormalDiv">
          <span className="titleInput">Launch Date</span>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            className="listingInput"
          />
        </div>
        <div className="listingCheckboxDiv">
            <input type="checkbox" onChange={handleChange} checked={checked} name="checked"/>
            <span className="whiteSpan">&nbsp;&nbsp;I agree to the&nbsp;&nbsp;</span>
            <span className="redSpan"> Terms and Conditions</span>
                
        </div>
        <div className="listingBtnDiv">
          <button id="backBtn" onClick={backBtnClicked}>Back</button>
          <button onClick={submitListingInfo} id="submitBtn" type="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default Listcoin;
