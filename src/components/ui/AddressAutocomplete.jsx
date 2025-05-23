import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Controller } from "react-hook-form";

function AddressAutocomplete({ control, defaultAddress }) {
  const [address, setAddress] = useState(defaultAddress);
  // const [coordinates, setCoordinates] = useState([]);
  const autocompleteRef = useRef(null);

  return (
    <Controller
      name="address"
      control={control}
      rules={{
        required: "L'indirizzo e' obbligatorio",
        minLength: { value: 5, message: "L'indirizzo deve avere almeno 5 caratteri" },
      }}
      render={({
        field: { onChange, value, ...restField },
        fieldState: { error },
      }) => (
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={() => {
            // const { formatted_address, geometry } =
            //   autocompleteRef.current.getPlace();
            if (autocompleteRef.current.getPlace()) {
              setAddress(autocompleteRef.current.getPlace());
              // setCoordinates(geometry.location.lat(), geometry.location.lng());
              onChange(autocompleteRef.current.getPlace().formatted_address);
              console.log(address.formatted_address);
              console.log(address.geometry.location.lat());
            }
          }}
          restrictions={{ country: "it" }}
          className={`${error ? "is-invalid" : ""}`}
        >
          <input
            type="text"
            id="address"
            placeholder="Inserisci il tuo indirizzo"
            className={`form-control ${error ? "is-invalid" : ""}`}
            {...restField}

            value={address.formatted_address}
            onChange={(e) => setAddress(e.target.value.trim())}

          />
        </Autocomplete>
      )}
    />
  );
}

export default AddressAutocomplete;
