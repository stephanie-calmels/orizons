const [selectedPhoto, setSelectedPhoto] = useState(null);

  const onChangeHandler = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePhoto', selectedPhoto);
    // eslint-disable-next-line no-console
    console.log(formData);
    const config = {
      method: 'post',
      url: 'https://orizons.herokuapp.com/uploads/profile-photo',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    };
    axios(config)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
      });
    //   .catch((error) => {
    //     const errorMessage = (error.response
    // && error.response.data
    // && error.response.data.message)
    // || error.message
    // || error.toString();
    //     console.log(errorMessage);
    //   });
    }
;
