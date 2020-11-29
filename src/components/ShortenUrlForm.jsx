/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, [value]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        // TODO: shorten url and copy to clipboard
        fetch('https://api-ssl.bitly.com/v4/shorten', {
            method: 'POST',
            headers: {
                Authorization: process.env.REACT_APP_BITLY_AUTHORIZATION_TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                long_url: value,
                domain: 'bit.ly',
            }),
        })
            .then(response => response.json())
            .then(({ link }) => {
                setShortenedUrl(link);
                navigator.clipboard.writeText(link);
            });
    }, [value]);

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="shorten">
                Url:
                <input placeholder="Url to shorten" id="shorten" type="text" value={value} onChange={onChange} />
            </label>
            <input type="submit" value="Shorten and copy URL" />
            {/* TODO: show below only when the url has been shortened and copied */}
            {!!shortenedUrl?.length && (
                <p>
                    {/* Show shortened url --- copied! */}
                    {`${shortenedUrl} - copied!`}
                </p>
            )}
        </form>
    );
};

export default ShortenUrlForm;
